import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  usuario: any[];
  localuser: any;

  constructor(private authservice: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.localuser = {
      email: '', rol: ''
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  login() {
    if(this.email=='' || this.password=='' )
    {
      this.toastr.error('Ingrese el correo electrónico y la contraseña', 'Campos incompletos', {
        positionClass: 'toast-bottom-right'
      });
    }
    else
    {
      if (this.email, this.password) {
        this.authservice.loginWithEmail(this.email, this.password)
          .then(respuesta => {
            console.log(respuesta);
            
            this.authservice.getUsuarioE(this.email).subscribe(res => {
              this.usuario = [];
              res.forEach((element: any) => {
                this.usuario.push({
                  id: element.payload.doc.id,
                  ...element.payload.doc.data()
                })
              });
              this.localuser.email = this.usuario[0].email;
              this.localuser.rol = this.usuario[0].rol;
              localStorage.setItem('usuario', JSON.stringify(this.localuser));
              this.router.navigate(['/userinfo'])
            });
  
          }).catch(e=>
            this.toastr.error('Correo electrónico ó contraseña incorrectos', 'Incorrectos!', {
              positionClass: 'toast-bottom-right'
            })
            )
      }
    }
  }
}