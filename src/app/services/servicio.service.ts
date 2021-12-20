import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {Servi} from '../models/servi';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

interface serv {
  idServicio: any;
  tiposerv:string;
  precioserv:string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  serv : Servi[];

  constructor(private firestore: AngularFirestore) { }

  agregarServicio(servicio: any): Promise<any> {
    return this.firestore.collection('servicios').add(servicio);
  }

  getServicios(): Observable<any> {
    return this.firestore.collection('servicios').snapshotChanges();
  }

  getServicios2(): Observable<any> {
    return this.firestore.collection('servicios').snapshotChanges().pipe(map(room=>{
      return room.map(res=>{
        const data: serv = res.payload.doc.data() as serv;
        data.idServicio=res.payload.doc.id;
        return data;
      })
    }));
  }

  eliminarServicio(id: string): Promise<any> {
    return this.firestore.collection('servicios').doc(id).delete();
  }

  getServicio(id: string): Observable<any> {
    return this.firestore.collection('servicios').doc(id).snapshotChanges();
  }

  actualizarServicio(id: string, data:any): Promise<any> {
    return this.firestore.collection('servicios').doc(id).update(data);
  }
}
