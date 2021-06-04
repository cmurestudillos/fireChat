import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
// Importamos la interfaz de chat
import { Mensaje } from '../models/mensaje.model';

import { AngularFireAuth } from '@angular/fire/auth';
// import firebase from 'firebase/app'
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any = {};


  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      console.log('Estado del usuario:', user);
      if(!user){
        return;
      }else{
        this.usuario.nombre = user.displayName;
        this.usuario.id = user.uid;
      }
    });
  }

  login( proveedor:string ){
    if(proveedor === 'google'){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }else{
      this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

  }
  logout(){
    // Restaurar las propiedades el usuario
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  // Metodo para la carga de los mensajes del chat
  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges()
                               .pipe(
                                 map( (mensajes:Mensaje[]) => {
                                  console.log(mensajes);

                                  // Inicializamos el Array
                                  this.chats = [];
                                  for (let mensaje of mensajes) {
                                    this.chats.unshift(mensaje);
                                  }
                                  return this.chats;
                                  // this.chats = mensajes;
                                 })
                               );
  }

  // Metodo para insertar los mensajes nuevos en la BBDD de firebase
  agregarMensaje( texto:string ){

    // Objeto que se enviara a Firebase
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      id: this.usuario.id
    }
    // insertamos los datos en la coleccion
    return this.itemsCollection.add(mensaje);

  }

}
