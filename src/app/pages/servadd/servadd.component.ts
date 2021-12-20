import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-servadd',
  templateUrl: './servadd.component.html',
  styleUrls: ['./servadd.component.css']
})
export class ServaddComponent implements OnInit {

  createServicio: FormGroup;
  submitted=false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Servicio';
  total:string;
  listaproductos: Venta[];
  
  constructor(private fb: FormBuilder,
    private _servicioService: ServicioService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) 
  {
    this.createServicio = this.fb.group({
      tiposerv: ['',Validators.required],  
      precioserv: ['',Validators.required] 
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit() { 
    this.esEditar();

  }

  agregarEditarServicio() {
    this.submitted = true;

    if (this.createServicio.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarServicio();
    } else {
      this.editarServicio(this.id);
    }

  }

  agregarServicio() {
    this.submitted = true;
    if(this.createServicio.invalid){
      return;
    }
    const servicio: any ={
      tiposerv: this.createServicio.value.tiposerv,
      precioserv: this.createServicio.value.precioserv
    }
    this.loading = true;
    this._servicioService.agregarServicio(servicio).then(()=>{
      this.toastr.success('El servicio fue registrado con exito!', 'Servicio Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/servlist']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
    })    
  }
  
  editarServicio(id: string) {

    const servicio: any = {
      tiposerv: this.createServicio.value.tiposerv,
      precioserv: this.createServicio.value.precioserv
    }

    this.loading = true;

    this._servicioService.actualizarServicio(id, servicio).then(() => {
      this.loading = false;
      this.toastr.info('El servicio fue modificado con exito', 'Servicio modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/servlist']);
    })
  }


  esEditar() {
    this.titulo = 'Datos del Servicio'
    if (this.id !== null) {
      this.loading = true;
      this._servicioService.getServicio(this.id).subscribe(data => {
        this.loading = false;
        this.createServicio.setValue({
          tiposerv: data.payload.data()['tiposerv'],
          precioserv: data.payload.data()['precioserv'],
        })
      })
    }
  }
}

