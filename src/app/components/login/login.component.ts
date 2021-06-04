import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _chat: ChatService ) { }

  ngOnInit() {
  }

  ingresar(proveedor:string){
    // console.log(proveedor);
    // llamamos a la funcion login del servicio
    this._chat.login(proveedor);

  }

}
