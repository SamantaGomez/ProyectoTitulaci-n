import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paysheetadd',
  templateUrl: './paysheetadd.component.html',
  styleUrls: ['./paysheetadd.component.css']
})
export class PaysheetaddComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted=false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';
  
  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) 
  {
    this.createEmpleado = this.fb.group({
      fechaingreso: ['',Validators.required],
      fechasalida: [''],
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      cedula: ['',Validators.required],
      edad: ['',Validators.required],
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

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.createEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado() {
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }
    const empleado: any ={
      fechaingreso: this.createEmpleado.value.fechaingreso,
      fechasalida: this.createEmpleado.value.fechasalida,
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      cedula: this.createEmpleado.value.cedula,
      edad: this.createEmpleado.value.edad,
      direccion: this.createEmpleado.value.direccion,
      telefono: this.createEmpleado.value.telefono,
      correo: this.createEmpleado.value.correo
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/paysheet']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
    })    
  }
  
  editarEmpleado(id: string) {

    const empleado: any = {
      fechaingreso: this.createEmpleado.value.fechaingreso,
      fechasalida: this.createEmpleado.value.fechasalida,
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      cedula: this.createEmpleado.value.cedula,
      edad: this.createEmpleado.value.edad,
      direccion: this.createEmpleado.value.direccion,
      telefono: this.createEmpleado.value.telefono,
      correo: this.createEmpleado.value.correo
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/paysheet']);
    })
  }


  esEditar() {
    this.titulo = 'Datos del Empleado'
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        this.createEmpleado.setValue({
          fechaingreso: data.payload.data()['fechaingreso'],
          fechasalida: data.payload.data()['fechasalida'],
          nombres: data.payload.data()['nombres'],
          apellidos: data.payload.data()['apellidos'],
          cedula: data.payload.data()['cedula'],
          edad: data.payload.data()['edad'],
          direccion: data.payload.data()['direccion'],
          telefono: data.payload.data()['telefono'],
          correo: data.payload.data()['correo'],
        })
      })
    }
  }
}


