import { Component, OnInit } from '@angular/core';
// Importamos el servicio
import { ChatService } from 'src/app/services/chat.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento:any;

  constructor(public _chat: ChatService) {
    this._chat.cargarMensajes()
        .subscribe( () => {
          setTimeout( ()=>{
            this.elemento.scrollTop = this.elemento.scrollHeight;
          },20);

        });
   }

  ngOnInit() {
    // Obtenemos la referencia del elemento html
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length === 0){
      return;
    }else{
      this._chat.agregarMensaje(this.mensaje)
          .then(()=> {
            this.mensaje = "";
            console.log('Mensaje enviado.');
          })
          .catch((err) => {
            console.error('Error al enviar mensaje.', err);
          });
          ;
    }
  }

}
