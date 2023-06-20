import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CancionShareComponent } from '../cancion-share/cancion-share.component';

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  constructor(
    private cancionService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioServicio: UsuarioService,
    public dialog: MatDialog
  ) { }

  userId: number
  token: string
  canciones: Array<Cancion>
  mostrarCanciones: Array<Cancion>
  cancionSeleccionada: any
  indiceSeleccionado: number
  displayedColumns: string[] = ['titulo', 'duracion', 'share'];
  users_names: string;

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      this.cerrarSession();
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getCanciones();
    }
  }

  getCanciones():void{
    this.cancionService.getCanciones(this.userId,this.token)
    .subscribe(canciones => {
      this.canciones = canciones
      this.mostrarCanciones = canciones
      if(canciones.length>0){
        this.onSelect(this.mostrarCanciones[0], 0)
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

  onSelect(c: Cancion, index: number){
    console.log("Indice: " + index)
    if (c.propia === "True") {
      this.indiceSeleccionado = index
      this.cancionSeleccionada = c
      this.cancionService.getAlbumesCancion(c.id)
      .subscribe(albumes => {
        this.cancionSeleccionada.albumes = albumes
      },
      error => {
        this.showError(`Ha ocurrido un error: ${error.message}`)
      })
    }

  }

  buscarCancion(busqueda: string){
    let cancionesBusqueda: Array<Cancion> = []
    this.canciones.map( cancion => {
      if(cancion.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())){
        cancionesBusqueda.push(cancion)
      }
    })
    this.mostrarCanciones = cancionesBusqueda
  }

  eliminarCancion(){
    this.cancionService.eliminarCancion(this.cancionSeleccionada.id)
    .subscribe(cancion => {
      this.ngOnInit()
      this.showSuccess()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  irCrearCancion(){
    this.routerPath.navigate([`/ionic/canciones/create/${this.userId}/${this.token}`])
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
  }

  cerrarSession(){
    this.usuarioServicio.cerrarSession();
    this.routerPath.navigate(['/auth']);
  }

  openDialog(cancion: Cancion): void {
    const dialogRef = this.dialog.open(CancionShareComponent, {
      width: '250px',
      data: {
        users_names: this.users_names,
        cancion_id: cancion.id,
        titulo: cancion.titulo,
        userId: this.userId,
        token: this.token
      }
    });
  }


}
