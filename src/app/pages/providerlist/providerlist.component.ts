import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-providerlist',
  templateUrl: './providerlist.component.html',
  styleUrls: ['./providerlist.component.css']
})
export class ProviderlistComponent implements OnInit {

  proveedores: any[] = [];

   constructor(private _proveedorService: ProveedorService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getProveedores()
  }

  getProveedores() {
    this._proveedorService.getProveedores().subscribe(data => {
      this.proveedores = [];
      data.forEach((element: any) => {
        this.proveedores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.proveedores);
    });
  }

  eliminarProveedor(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion){
      this._proveedorService.eliminarProveedor(id);
      this.toastr.error('El proveedor fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
  
}


