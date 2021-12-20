import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import {AuthService} from 'src/app/services/auth.service';
// import {AngularFireAuth} '@angular/fire/auth';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {

  clientes: any[] = [];

   constructor(private _clienteService: ClienteService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getlientes()
  }

  getlientes() {
    this._clienteService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.clientes);
    });
  }

  eliminarCliente(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion){
      this._clienteService.eliminarCliente(id);
      this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }

}
