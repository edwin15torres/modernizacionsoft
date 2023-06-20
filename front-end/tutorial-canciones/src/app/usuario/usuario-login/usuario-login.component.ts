import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioSesion } from '../usuario-sesion';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  helper = new JwtHelperService();

  miFormulario: FormGroup = this.fb.group({
    usuario: [ , [ Validators.required, Validators.maxLength(50) ]   ],
    contrasena: [ , [ Validators.required, Validators.maxLength(50), Validators.minLength(4)] ]
  })

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
    ) { }
  
  error: boolean = false

  ngOnInit() {
  }

  onLogInUsuario(){
    this.error = false
    let usuario = this.miFormulario.get('usuario')?.value;
    let contrasena = this.miFormulario.get('contrasena')?.value;
    this.usuarioService.userLogIn(usuario, contrasena)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      //this.router.navigate([`/albumes/${decodedToken.sub}/${res.token}`])
      this.router.navigate([`/ionic/home/${decodedToken.sub}/${res.token}`])
      //this.router.navigate([`/ionic/`])
    },
    error => {
      this.error=true
    })
  }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  registrarse(){
    this.router.navigate(['/auth/signup']);
  }

}
