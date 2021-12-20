import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
interface pro {
    idProv?:any;
    fechaingreso:Date;
    nombre: string;
    apellido:string;
    cedula: number;
    edad: number;
    direccion:string;
    telefono:string;
}
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private proveedorCollection: AngularFirestoreCollection<Proveedor>;
  private proveedores: Observable<Proveedor[]>;
  pro : Proveedor[];

  constructor(private firestore: AngularFirestore) { 
    this.proveedorCollection = firestore.collection('provedores');
    this.proveedores = this.proveedorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      })
    );
  }
  agregarProveedor(proveedor: any): Promise<any> {
    return this.firestore.collection('proveedores').add(proveedor);
  }
  
  getProveedores(): Observable<any> {
    return this.firestore.collection('proveedores').snapshotChanges();
  }

  getproveedores2(): Observable<any> {
    return this.firestore.collection('proveedores').snapshotChanges().pipe(map(room=>{
      return room.map(res=>{
        const data: pro = res.payload.doc.data() as pro;
        data.idProv=res.payload.doc.id;
        return data;
      })
    }));
  }
  eliminarProveedor(id: string): Promise<any> {
    return this.firestore.collection('proveedores').doc(id).delete();
  }

  getProveedor(id: string): Observable<any> {
    return this.firestore.collection('proveedores').doc(id).snapshotChanges();
  }

  actualizarProveedor(id: string, data:any): Promise<any> {
    return this.firestore.collection('proveedores').doc(id).update(data);
  }

}
