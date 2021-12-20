import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
interface cli{
    idCliente:any;
    razonsocial: string;
    ruc: number;
    correo: string;
    direccion:string;
    telefono:string;
}
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  cli:Cliente[];

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(proveedor: any): Promise<any> {
    return this.firestore.collection('clientes').add(proveedor);
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  getclientes2(): Observable<any> {
    return this.firestore.collection('clientes').snapshotChanges().pipe(map(room=>{
      return room.map(res=>{
        const data: cli = res.payload.doc.data() as cli;
        data.idCliente=res.payload.doc.id;
        return data;
      })
    }));
  }
  eliminarCliente(id: string): Promise<any> {
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id: string): Observable<any> {
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data:any): Promise<any> {
    return this.firestore.collection('clientes').doc(id).update(data);
  }
  getClienteCedula(ruc: number): Observable<any> {
    return this.firestore.collection('clientes', ref => ref.where('ruc','==',ruc)).valueChanges().pipe(take(1),
    map(cliente=>{
      return cliente;
    }));
  }
}
