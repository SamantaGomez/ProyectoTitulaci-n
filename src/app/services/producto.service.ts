import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Producto} from '../models/producto';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
interface prod {
  idProducto?: any;
  idProveedor:string;
  fechacompra:Date;
  tipo:string;
  marca:string;
  cantidad: number;
  precioproveedor: number;
  precioventa:number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  prod : Producto[];

  constructor(private firestore: AngularFirestore) { }

  agregarProducto(producto: any): Promise<any> {
    return this.firestore.collection('productos').add(producto);
  }

  getProductos(): Observable<any> {
    return this.firestore.collection('productos').snapshotChanges();
  }

  getProductos2(): Observable<any> {
    return this.firestore.collection('productos').snapshotChanges().pipe(map(room=>{
      return room.map(res=>{
        const data: prod = res.payload.doc.data() as prod;
        data.idProducto=res.payload.doc.id;
        return data;
      })
    }));
  }

  getProductoProveedor(proveedores: any)
  {
    return this.firestore.collection('proveedores',ref => ref.where('productos','==',proveedores)).snapshotChanges();
  }
  eliminarProducto(id: string): Promise<any> {
    return this.firestore.collection('productos').doc(id).delete();
  }

  getProducto(id: string): Observable<any> {
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }

  actualizarProducto(id: string, data:any): Promise<any> {
    return this.firestore.collection('productos').doc(id).update(data);
  }
  ActualizarCantProducto(id: string, nuevacantidad:any): Promise<any> {
    return this.firestore.collection('productos').doc(id).update({cantidad:nuevacantidad});
  }
  }