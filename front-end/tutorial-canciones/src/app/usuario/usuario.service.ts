import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


import { UsuarioSesion } from './usuario-sesion';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    helper = new JwtHelperService();

    private backUrl: string = environment.baseUrl
    private _session: UsuarioSesion|undefined;

    constructor(private http: HttpClient) { }

    get session(){
        return {...this._session!}
    }

    cerrarSession(){
        this._session = undefined;
        console.log('SERVICIO' , this._session);
    }

    userLogIn(nombre: string, contrasena: string):Observable<any>{
        return this.http.post<any>(`${this.backUrl}/logIn`, {"nombre": nombre, "contrasena": contrasena })
        .pipe(
            tap( resp => {
                const decodedToken = this.helper.decodeToken(resp.token);
                this._session = new  UsuarioSesion(decodedToken.sub,nombre,resp.token);
                console.log('SERVICIO' , this._session);
            }

            )
        );
    }

    userSignUp(nombre: string, contrasena: string): Observable<any>{
        return this.http.post<any>(`${this.backUrl}/signin`, {"nombre": nombre, "contrasena": contrasena})
    }
}
