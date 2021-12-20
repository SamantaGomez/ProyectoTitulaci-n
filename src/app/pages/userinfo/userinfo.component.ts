import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  localusuario:any;
  usuario: any;

  constructor(public authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.localusuario={
      email:'',rol:''
    }
    this.localusuario=localStorage.getItem('usuario');
    this.usuario=JSON.parse(this.localusuario);
    
  }

  inventario(){
    this.router.navigate(['/stocktaking'])
  }


}
