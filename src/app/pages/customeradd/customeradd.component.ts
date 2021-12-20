import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customeradd',
  templateUrl: './customeradd.component.html',
  styleUrls: ['./customeradd.component.css']
})
export class CustomeraddComponent implements OnInit {

  createCliente: FormGroup;
  submitted=false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';
  
  constructor(private fb: FormBuilder,
    private _clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) 
  {
    this.createCliente = this.fb.group({
      razonsocial: ['',Validators.required],
      ruc: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',Validators.required],
      correo: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.id)
  }

  ngOnInit() { 
    this.esEditar();
  }

  agregarEditarCliente() {
    this.submitted = true;

    if (this.createCliente.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.id);
    }

  }

  agregarCliente() {
    this.submitted = true;
    if(this.createCliente.invalid){
      return;
    }
    const cliente: any ={
      razonsocial: this.createCliente.value.razonsocial,
      ruc: this.createCliente.value.ruc,
      direccion: this.createCliente.value.direccion,
      telefono: this.createCliente.value.telefono,
      correo: this.createCliente.value.correo
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(()=>{
      this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/customerlist']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
    })    
  }
  
  editarCliente(id: string) {

    const cliente: any = {
      razonsocial: this.createCliente.value.razonsocial,
      ruc: this.createCliente.value.ruc,
      direccion: this.createCliente.value.direccion,
      telefono: this.createCliente.value.telefono,
      correo: this.createCliente.value.correo
    }

    this.loading = true;

    this._clienteService.actualizarCliente(id, cliente).then(() => {
      this.loading = false;
      this.toastr.info('El cliente fue modificado con exito', 'Cliente modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/customerlist']);
    })
  }


  esEditar() {
    this.titulo = 'Datos del Cliente'
    if (this.id !== null) {
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe(data => {
        this.loading = false;
        this.createCliente.setValue({
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
