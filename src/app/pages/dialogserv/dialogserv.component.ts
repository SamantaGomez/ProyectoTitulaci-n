import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from 'src/app/models/venta';
import { ServicioService} from 'src/app/services/servicio.service';
import {FormControl} from '@angular/forms';

export interface Servicio {
  idServicio: any;
  tiposerv:string;
  precioserv:string;
}

@Component({
  selector: 'app-dialogserv',
  templateUrl: './dialogserv.component.html',
  styleUrls: ['./dialogserv.component.css']
})
export class DialogservComponent implements OnInit {

  listaservicios: any[];
  servicioseleccionado: any;

  constructor(
    private _servicio: ServicioService,
    public dialog: MatDialogRef<DialogservComponent>,   
    @Inject(MAT_DIALOG_DATA) public data: DialogservComponent
  ) { 
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  agregar()
  {
    this.dialog.close(JSON.parse(this.servicioseleccionado))
  }
  cargarServicios()
  {
    this.listaservicios=[]
    this._servicio.getServicios2().subscribe(res=>{
      this.listaservicios = res;
      // console.log(this.listaproductos);
    })
  }
}
