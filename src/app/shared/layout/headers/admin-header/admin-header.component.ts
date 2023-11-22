import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from '@soa/login/services/login.service';
import { MenssageService } from '@soa/login/services/menssage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styles: [
    `
      .flex-spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AdminHeaderComponent {
  @Output() clickedMenu: EventEmitter<any> = new EventEmitter<any>();

  isLogged!: boolean;
  isAdmin!: boolean;
  username!: boolean;
  constructor(private loginService: LoginService, private messageService: MenssageService) {}

  ngOnInit(): void{

    this.messageService.getMessage().subscribe(res =>{
      this.username = res['text']
      this.isLogged = res['isLogged']
    },
    err => console.log(err));
    
  }

  handleClickMenu() {
    this.clickedMenu.emit();
  }

  public login(){
    this.loginService.login();
  }

  public logout(){
    this.loginService.logout();
  }
}
