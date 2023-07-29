import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album';
import { Cancion } from '../cancion/cancion';
import { Usuario } from '../usuario/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrlUsuario: string = environment.baseUrlUsuario
  private baseUrlCancion: string = environment.baseUrlCancion
  private baseUrlAlbum: string = environment.baseUrlAlbum

  constructor(private http: HttpClient) { }

  getAlbumes(usuario: number, token: string): Observable<Album[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Album[]>(`${this.baseUrlAlbum}/usuario/${usuario}/albumes`, {headers: headers})
  }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.baseUrlCancion}/album/${idAlbum}/canciones`, {headers: headers})
  }

  crearAlbum(idUsuario: number, token: string, album: Album):Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Album>(`${this.baseUrlAlbum}/usuario/${idUsuario}/albumes`, album, {headers: headers})
  }

  getAlbum(albumId: number): Observable<Album>{
    return this.http.get<Album>(`${this.baseUrlAlbum}/album/${albumId}`)
  }

  editarAlbum(idUsuario: number, token: string, albumId: number, album: Album): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Album>(`${this.baseUrlAlbum}/album/${albumId}`, album, {headers: headers})
  }

  eliminarAlbum(idUsuario: number, token: string, albumId: number): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Album>(`${this.baseUrlAlbum}/album/${albumId}`, {headers: headers})
  }

  asociarCancion(albumId: number, cancionId: number): Observable<Cancion>{
    return this.http.post<Cancion>(`${this.baseUrlCancion}/album/${albumId}/canciones`,
        {"id_cancion": cancionId}
      )
  }

  compartirAlbum(idAlbum: number, idUsuarioD: string, idUsuario: number, token: string):Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Album>(`${this.baseUrlAlbum}/recurso/compartido`,
      {
        "usuario_origen_id": idUsuario,
        "usuario_destino": idUsuarioD,
        "id_recurso": idAlbum,
        "tipo_recurso": "ALBUM"
      },
      {headers: headers})
  }

  getUsuariosCompartidos(idAlbum: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrlAlbum}/recurso/compartido/${idAlbum}/usuario`)
  }

}
