import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
interface productoProveedor{
    idProducto?: any;
    fechacompra:Date;
    tipo:string;
    marca:string;
    cantidad: number;
    precioproveedor: number;
    precioventa:number;
    idProv?:any;
    fechaingreso:Date;
    nombre: string;
    apellido:string;
    cedula: number;
    edad: number;
    direccion:string;
    telefono:string;
}
@Component({
  selector: 'app-stocktaking',
  templateUrl: './stocktaking.component.html',
  styleUrls: ['./stocktaking.component.css']
})
export class StocktakingComponent implements OnInit {

  productos: any[] = [];
  proveedores: any[];
  palabrabuscar:string='';

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService,
    private _proveedor: ProveedorService) {
  }

  ngOnInit(): void {
    this.getProductos();
    
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarProducto(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion) {
      this._productoService.eliminarProducto(id);
      this.toastr.error('El producto fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
// filtro 
buscar() {
  this.palabrabuscar = '';
}
}
