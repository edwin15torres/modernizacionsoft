import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Album, Cancion } from '../album';
import { AlbumShareComponent } from '../album-share/album-share.component';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  constructor(
    private albumService: AlbumService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router,
    private usuarioServicio: UsuarioService,
    public dialog: MatDialog
  ) { }

  userId: number
  token: string
  albumes: Array<Album>
  mostrarAlbumes: Array<Album>
  albumSeleccionado: Album
  indiceSeleccionado: number
  displayedColumns: string[] = ['titulo', 'anio', 'share'];
  users_names: string;

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      this.cerrarSession();
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getAlbumes();
    }
  }

  getAlbumes():void{
    this.albumService.getAlbumes(this.userId, this.token)
    .subscribe(albumes => {
      console.log(albumes)
      this.albumes = albumes
      this.mostrarAlbumes = albumes
      console.log(albumes)
      if(albumes.length>0){
        this.onSelect(this.mostrarAlbumes[0], 0)
      }
    },
    error => {
      console.log(error)
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        this.cerrarSession();
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        this.cerrarSession();
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })

  }

  onSelect(a: Album, index: number){
    if (a.propio === 1) {
      this.indiceSeleccionado = index
      this.albumSeleccionado = a
      this.albumService.getCancionesAlbum(a.id, this.token)
      .subscribe(canciones => {
        this.albumSeleccionado.canciones = canciones
        this.albumSeleccionado.interpretes = this.getInterpretes(canciones)
      },
      error =>{
        this.showError("Ha ocurrido un error, " + error.message)
      })
    }
  }

  getInterpretes(canciones: Array<Cancion>): Array<string>{
    var interpretes: Array<string> = []
    canciones.map( c => {
      if(!interpretes.includes(c.interprete)){
        interpretes.push(c.interprete)
      }
    })
    return interpretes
  }

  buscarAlbum(busqueda: string){
    let albumesBusqueda: Array<Album> = []
    this.albumes.map( albu => {
      if( albu.titulo.toLocaleLowerCase().includes(busqueda.toLowerCase())){
        albumesBusqueda.push(albu)
      }
    })
    this.mostrarAlbumes = albumesBusqueda
  }

  irCrearAlbum(){
    this.routerPath.navigate([`/ionic/albumes/create/${this.userId}/${this.token}`])
  }

  eliminarAlbum(){
    this.albumService.eliminarAlbum(this.userId, this.token, this.albumSeleccionado.id)
    .subscribe(album => {
      this.ngOnInit();
      this.showSuccess();
    },
    error=> {
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        this.cerrarSession();
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        this.cerrarSession();
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })
    this.ngOnInit()
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El album fue eliminado`, "Eliminado exitosamente");
  }

  cerrarSession(){
    this.usuarioServicio.cerrarSession();
    this.routerPath.navigate(['/auth']);
  }

  openDialog(album: Album): void {
    const dialogRef = this.dialog.open(AlbumShareComponent, {
      width: '250px',
      data: {
        users_names: this.users_names,
        album_id: album.id,
        titulo: album.titulo,
        userId: this.userId,
        token: this.token
      }
    });
  }


}
