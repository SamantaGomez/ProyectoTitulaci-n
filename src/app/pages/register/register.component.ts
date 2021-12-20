import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

  user = {
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    fechaingreso: "",
    fechasalida: "",
    cedula: "",
    edad: "",
    telefono: "",
    direccion: "",
    rol: "0"
  }

  message = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  submitted = false;
  loading = false;
  firestore: any;
  usuario: any[];
  id: string | null;

  constructor(private authservice: AuthService, private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private _usuarioService: UsuarioService) {
  }
  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    if (this.id == null) {
      this.user = {
        email: "",
        password: "",
        nombres: "",
        apellidos: "",
        fechaingreso: "",
        fechasalida: "",
        cedula: "",
        edad: "",
        telefono: "",
        direccion: "",
        rol: "0"
      }
    }
    else {     
      this._usuarioService.getUsuario(this.id).subscribe(res => {
        this.user=res;
      })
    }
  }
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
  register() {
    if(this.id==null)
    {
      if (this.user.password == '' || this.user.password.length < 6) {
        this.toastr.error('La contraseña debe tener al menos 6 caracteres', 'Contraseña incorrecta', {
          positionClass: 'toast-bottom-right'
        });
      }
      else if (this.user.fechaingreso == '' || this.user.rol == '0' || this.user.nombres == '' || this.user.apellidos == ''
        || this.user.edad == '' || this.user.edad == null || this.user.cedula == '' || this.user.direccion == '' || this.user.telefono == '' || this.user.email == '') {
        this.toastr.error('Debe llenar todos los campos', 'Campos incompletos', {
          positionClass: 'toast-bottom-right'
        });
      }
      else {
        this.authservice.getcomprobarusuario(this.user.email).subscribe(res => {
          console.log(res);
  
  
          if (res.length) {
            this.toastr.error('Ya existe el usuario!', 'Ya existe el usuario', {
              positionClass: 'toast-bottom-right'
            });
          }
          else {
            this.authservice.registerWithEmail(this.user.email, this.user.password, this.user.fechaingreso, this.user.fechasalida, this.user.nombres, this.user.apellidos, this.user.cedula, this.user.edad, this.user.telefono, this.user.direccion, this.user.rol)
              .then(() => {
                this.toastr.success('Se ha registrado el usuario exitosamente', 'Usuario registrado', {
                  positionClass: 'toast-bottom-right'
                });
                this.router.navigate(['/paysheet'])
              })
          }
        })
      }
    }
    else
    {
      if (this.user.password == '' || this.user.password.length < 6) {
        this.toastr.error('La contraseña debe tener al menos 6 caracteres', 'Contraseña incorrecta', {
          positionClass: 'toast-bottom-right'
        });
      }
      else if (this.user.fechaingreso == '' || this.user.rol == '0' || this.user.nombres == '' || this.user.apellidos == ''
        || this.user.edad == '' || this.user.edad == null || this.user.cedula == '' || this.user.direccion == '' || this.user.telefono == '' || this.user.email == '') {
        this.toastr.error('Debe llenar todos los campos', 'Campos incompletos', {
          positionClass: 'toast-bottom-right'
        });
      }
      else{
        this._usuarioService.actualizarUsuario(this.id,this.user).then(() => {
          this.toastr.info('El usuario fue modificado con exito', 'Usuario modificado', {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(['/paysheet']);
        })
      }
    }
  }
}
