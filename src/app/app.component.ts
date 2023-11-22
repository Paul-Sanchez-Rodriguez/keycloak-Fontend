import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MenssageService } from './login/services/menssage.service';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  isAdmin!: boolean;

  constructor(
    private oauthService: OAuthService,
    private messageService: MenssageService,
    private loginService: LoginService) {
    this.configure();
  }

  authConfig: AuthConfig = {

    issuer: 'http://localhost:8090/realms/PRS',
    redirectUri: window.location.origin,
    clientId: 'backend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidIdToken()) {
          this.isAdmin = this.loginService.getIsAdmin();
          const username = this.oauthService.getIdentityClaims()['preferred_username']
          this.messageService.sendMessage(username, this.loginService.getIsLoggerd());
        }
      });

  }


}
