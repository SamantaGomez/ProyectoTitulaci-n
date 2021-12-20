import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-paysheet',
  templateUrl: './paysheet.component.html',
  styleUrls: ['./paysheet.component.css']
})
export class PaysheetComponent implements OnInit {

  empleados: any[] = [];

   constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('usuario'));
    
    this.getEmpleados()
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion){
      this._empleadoService.eliminarEmpleado(id);
      this.toastr.error('El usuario fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
  
}

