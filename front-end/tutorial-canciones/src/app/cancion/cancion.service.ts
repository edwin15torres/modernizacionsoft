import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from './cancion';
import { Album } from '../album/album';
import { Usuario } from '../usuario/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private backUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  getCanciones(usuarioCancion: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Cancion[]>(`${this.backUrl}/usuario/${usuarioCancion}/canciones`, {headers: headers})
  }

  getAlbumesCancion(cancionId: number): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.backUrl}/cancion/${cancionId}/albumes`)
  }

  crearCancion(idUsuario: number, token: string, cancion: Cancion):Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<Cancion>(`${this.backUrl}/usuario/${idUsuario}/canciones`, cancion, {headers: headers})
  }

  getCancion(cancionId: number): Observable<Cancion>{
    return this.http.get<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  editarCancion(cancion: Cancion, cancionId: number):Observable<Cancion>{
    return this.http.put<Cancion>(`${this.backUrl}/cancion/${cancionId}`, cancion)
  }

  eliminarCancion(cancionId: number): Observable<Cancion>{
    return this.http.delete<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  compartirCancion(idCancion: number, idUsuarioD: string, idUsuario: number, token: string):Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Cancion>(`${this.backUrl}/recurso/compartido`,
      {
        "usuario_origen_id": idUsuario,
        "usuario_destino": idUsuarioD,
        "id_recurso": idCancion,
        "tipo_recurso": "CANCION"
      },
      {headers: headers})
  }

  getUsuariosCompartidos(idCancion: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.backUrl}/recurso/cancion/${idCancion}/usuario`)
  }

}
