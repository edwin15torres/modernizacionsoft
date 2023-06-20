import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialogdata';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-album-share',
  templateUrl: './album-share.component.html',
  styleUrls: ['./album-share.component.css']
})
export class AlbumShareComponent implements OnInit {

  @Input() album: Album;

  userId: number;
  token: string;

  constructor(
    private albumService: AlbumService,
    private toastr: ToastrService,
    private usuarioServicio: UsuarioService,
    public dialogRef: MatDialogRef<AlbumShareComponent>,
    private router: ActivatedRoute,
    private routerPath: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  shareAlbum() {
    if (this.data.users_names) {
      this.albumService.compartirAlbum(this.data.album_id, this.data.users_names, this.data.userId, this.data.token)
        .subscribe(album => {
          this.showSuccess(album)
          this.routerPath.navigate([`/ionic/albumes/${this.userId}/${this.token}`])
        },
          error => {
            if (error.error) {
              this.showError(error.error)
              this.routerPath.navigate([`/ionic/albumes/${this.userId}/${this.token}`])
            }
            else if (error.statusText === "UNAUTHORIZED") {
              this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
              this.cerrarSession();
            }
            else if (error.statusText === "UNPROCESSABLE ENTITY") {
              this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
              this.cerrarSession();
            }
            else {
              this.showError("Ha ocurrido un error. " + error.message)
            }
          })
      }
      else {
        this.showError("Antes de compartir es necesario mínimo escoger un usuario.")
      }
  }

  cerrarSession() {
    this.usuarioServicio.cerrarSession();
    this.routerPath.navigate(['/auth']);
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(album: Album) {
    this.toastr.success(`El album ${this.data.titulo} se compartió correctamente.`, "Creación exitosa");
  }

}
