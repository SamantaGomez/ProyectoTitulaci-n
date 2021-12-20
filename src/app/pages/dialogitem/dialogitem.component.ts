import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Venta } from 'src/app/models/venta';
import { ProductoService} from 'src/app/services/producto.service';
import {FormControl} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dialogitem',
  templateUrl: './dialogitem.component.html',
  styleUrls: ['./dialogitem.component.css']
})
export class DialogitemComponent implements OnInit {

  listaproductos: any[];
  productoseleccionado: any;
  constructor(
    public dialog: MatDialogRef<DialogitemComponent>,
    private _producto: ProductoService,
  ) { 
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  agregar()
  {
    this.dialog.close(JSON.parse(this.productoseleccionado))
  }
  cargarProductos()
  {
    this.listaproductos=[]
    this._producto.getProductos2().subscribe(res=>{
      this.listaproductos = res;
    })
  }
}
