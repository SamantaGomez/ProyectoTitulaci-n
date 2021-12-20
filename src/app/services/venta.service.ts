import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private firestore: AngularFirestore) { }

  agregarVenta(venta: any): Promise<any> {
    return this.firestore.collection('ventas').add(venta);
  }

  getVentas(): Observable<any> {
    return this.firestore.collection('ventas').snapshotChanges();
  }

  eliminarVenta(id: string): Promise<any> {
    return this.firestore.collection('ventas').doc(id).delete();
  }

  getVenta(id: string): Observable<any> {
    return this.firestore.collection('ventas').doc(id).snapshotChanges();
  }

  actualizarVenta(id: string, data:any): Promise<any> {
    return this.firestore.collection('ventas').doc(id).update(data);
  }
  buscarventacliente(uid: string){
    return this.firestore.collection('ventas',ref => ref.where('clientes', 'array-contains',uid));
  }
}
