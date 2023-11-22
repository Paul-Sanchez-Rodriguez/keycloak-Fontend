import { Component, EventEmitter, Output } from '@angular/core';
import { MenssageService } from '@soa/login/services/menssage.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styles: [],
})
export class AdminSidebarComponent {
  @Output() clickedMenuItem: EventEmitter<any> = new EventEmitter<any>();

  isLogged?: boolean;

  constructor(private messageService:MenssageService ) {}

  ngOnInit(): void{

    this.messageService.getMessage().subscribe(res =>{
      this.isLogged = res['isLogged']
    },
    err => console.log(err));
    
  }


  clickMenuItem() {
    this.clickedMenuItem.emit();
  }
}
