import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servlist',
  templateUrl: './servlist.component.html',
  styleUrls: ['./servlist.component.css']
})
export class ServlistComponent implements OnInit {

  servicios: any[] = [];

   constructor(private _servicioService: ServicioService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getServicios()
  }

  getServicios() {
    this._servicioService.getServicios().subscribe(data => {
      this.servicios = [];
      data.forEach((element: any) => {
        this.servicios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.servicios);
    });
  }

  eliminarServicio(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion){
      this._servicioService.eliminarServicio(id);
      this.toastr.error('El servicio fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
  
}
