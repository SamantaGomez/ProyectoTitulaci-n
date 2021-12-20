import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import {map, take} from 'rxjs/operators';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  

  constructor(private afu: AngularFireAuth, private router: Router,
    private _usuarioService: UsuarioService, private toastr: ToastrService,
    private db: AngularFirestore,) { 
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

registerWithEmail(email: string, password: string , fechaingreso:string, fechasalida:string, nombres: string, apellidos:string, cedula:string, edad:string, telefono:string, direccion:string, rol:string) {
    return new Promise ((resolve,reject)=>{
      this.afu.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid= user.user?.uid;
        this.db.collection('usuarios').doc(uid).set({
          uid: uid,
          fechaingreso:fechaingreso,
          fechasalida:fechasalida,
          nombres :nombres,
          apellidos: apellidos,
          cedula:cedula,
          edad: edad,
          telefono:telefono,
          direccion:direccion,
          rol:rol,         
          email:email,
          password:password
        })
        resolve(user)
        this.authState = user
      })
    })
    
}
  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user
        console.log(user);
        
      })
  }

  singout(): void
  {
    this.afu.signOut().then(()=>{
      localStorage.removeItem('usuario')
      this.router.navigate(['/login']);
    });
  }

  isUserAdmin(userUid){
    return this.db.doc('usuarios/${userUid}').valueChanges();
  }

  getUsuarioE(email: string): Observable<any> {
    return this.db.collection('usuarios', ref => ref.where('email','==',email)).snapshotChanges();
  }
  getcomprobarusuario(email: string): Observable<any> {
    return this.db.collection('usuarios', ref => ref.where('email','==',email)).valueChanges().pipe(take(1),
    map(usuario=>{
      return usuario;
    }));
  }
}
