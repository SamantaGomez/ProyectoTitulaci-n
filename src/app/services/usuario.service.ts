
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(usuario: any): Promise<any> {
    return this.firestore.collection('usuarios').add(usuario);
  }

  getUsuarios(): Observable<any> {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  eliminarUsuario(id: string): Promise<any> {
    return this.firestore.collection('usuarios').doc(id).delete();
  }

  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).valueChanges().pipe(
      take(1),
      map(usuario=>{
        return usuario;
      })
    );
  }

  getUsuarioE(email: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(email).valueChanges().pipe(
      take(1),
      map(usuario=>{
        // usuario.email= email;
        return usuario;
      })
    );
  }

  actualizarUsuario(id: string, data:any): Promise<any> {
    return this.firestore.collection('usuarios').doc(id).update(data);
  }
}
