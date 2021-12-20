import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provideradd',
  templateUrl: './provideradd.component.html',
  styleUrls: ['./provideradd.component.css']
})
export class ProvideraddComponent implements OnInit {

  createProveedor: FormGroup;
  submitted=false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Proveedor';
  
  constructor(private fb: FormBuilder,
    private _proveedorService: ProveedorService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) 
  {
    this.createProveedor = this.fb.group({
      razonsocial: ['',Validators.required],
      ruc: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',Validators.required],
      correo: ['',Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.id)
  }

  ngOnInit() { 
    
    this.esEditar();
  }

  agregarEditarProveedor() {
    this.submitted = true;

    if (this.createProveedor.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarProveedor();
    }
    
    else {
      this.editarProveedor(this.id);
    }

  }

  agregarProveedor() {
    this.submitted = true;
    if(this.createProveedor.invalid){
      return;
    }
    const proveedor: any ={
      razonsocial: this.createProveedor.value.razonsocial,
      ruc: this.createProveedor.value.ruc,
      direccion: this.createProveedor.value.direccion,
      telefono: this.createProveedor.value.telefono,
      correo: this.createProveedor.value.correo
    }
    this.loading = true;
    this._proveedorService.agregarProveedor(proveedor).then(()=>{
      this.toastr.success('El proveedor fue registrado con exito!', 'Proveedor Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/providerlist']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
    })    
  }
  
  

  editarProveedor(id: string) {

    const proveedor: any = {
      razonsocial: this.createProveedor.value.razonsocial,
      ruc: this.createProveedor.value.ruc,
      direccion: this.createProveedor.value.direccion,
      telefono: this.createProveedor.value.telefono,
      correo: this.createProveedor.value.correo
    }

    this.loading = true;

    this._proveedorService.actualizarProveedor(id, proveedor).then(() => {
      this.loading = false;
      this.toastr.info('El proveedor fue modificado con exito', 'Proveedor modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/providerlist']);
    })
  }


  esEditar() {
    this.titulo = 'Datos del Proveedor'
    if (this.id !== null) {
      this.loading = true;
      this._proveedorService.getProveedor(this.id).subscribe(data => {
        this.loading = false;
        this.createProveedor.setValue({
          razonsocial: data.payload.data()['razonsocial'],
          ruc: data.payload.data()['ruc'],
          direccion: data.payload.data()['direccion'],
          telefono: data.payload.data()['telefono'],
          correo: data.payload.data()['correo'],
        })
      })
    }
  }
}

