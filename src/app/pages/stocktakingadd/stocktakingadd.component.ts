import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-stocktakingadd',
  templateUrl: './stocktakingadd.component.html',
  styleUrls: ['./stocktakingadd.component.css']
})
export class StocktakingaddComponent implements OnInit {

  createProducto: FormGroup;
  submitted=false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Producto';
  disableSelect = new FormControl(false);
  listaProveedores: any[];
  proveedor: any='';
  
  constructor(private fb: FormBuilder,
    private _productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private _proveedor: ProveedorService) 
  {

    this.createProducto = this.fb.group({
      descripcion: ['',Validators.required], 
      cantidad: ['',Validators.required], 
      precioproveedor: ['',Validators.required], 
      precioventa: ['',Validators.required],
      idproveedor:['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.id)

    
  }

  ngOnInit() { 
    this.esEditar();
    this.cargarProveedores();
  }

  agregarEditarProducto() {
    this.submitted = true;

    if (this.createProducto.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.editarProducto(this.id);
    }

  }

  agregarProducto() {
    this.submitted = true;
    if(this.createProducto.invalid){
      return;
    }
    // if(this.proveedor=='')
    // {
    //   console.log('falta llenar campo');
    // }
    const producto: any ={
      descripcion: this.createProducto.value.descripcion,
      cantidad: this.createProducto.value.cantidad,
      precioproveedor: this.createProducto.value.precioproveedor,
      precioventa: this.createProducto.value.precioventa,
      idproveedor: this.createProducto.value.idproveedor
    }
    
    
    this.loading = true;
    // console.log(producto);
    this._productoService.agregarProducto(producto).then(()=>{
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/stocktaking']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
    })    
  }
  
  editarProducto(id: string) {

    const producto: any = {
      descripcion: this.createProducto.value.descripcion,
      cantidad: this.createProducto.value.cantidad,
      precioproveedor: this.createProducto.value.precioproveedor,
      precioventa: this.createProducto.value.precioventa,
      idproveedor: this.createProducto.value.idproveedor
    }

    this.loading = true;

    this._productoService.actualizarProducto(id, producto).then(() => {
      this.loading = false;
      this.toastr.info('El producto fue modificado con exito', 'Producto modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/stocktaking']);
    })
  }


  esEditar() {
    this.titulo = 'Datos del Producto'
    if (this.id !== null) {
      this.loading = true;
      this._productoService.getProducto(this.id).subscribe(data => {
        this.loading = false;
        this.createProducto.setValue({
          descripcion: data.payload.data()['descripcion'],
          cantidad: data.payload.data()['cantidad'],
          precioproveedor: data.payload.data()['precioproveedor'],
          precioventa: data.payload.data()['precioventa'],
          idproveedor: data.payload.data()['idproveedor'],
        })
      })
    }
  }
  cargarProveedores()
  {
    this.listaProveedores=[]
    this._proveedor.getproveedores2().subscribe(res=>{
      this.listaProveedores = res;
      //console.log(this.listaProveedores);
    })
  }

}
