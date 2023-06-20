import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario';
import { Album } from '../album';
import { AlbumShareComponent } from '../album-share/album-share.component';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  @Input() album: Album;
  @Output() deleteAlbum = new EventEmitter();

  displayedColumns: string[] = ['index', 'name', 'duracion', 'interprete'];
  userId: number;
  token: string;
  users_names: string;
  mostrarCompartidosAlbum: Array<Usuario>
  displayedColumnsCompartidos: string[] = ['nombre'];

  constructor(
    private albumService: AlbumService,
    private routerPath: Router,
    private router: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
  }

  ngOnChanges() {
    this.getUsuariosCompartidos()
  }

  goToEdit(){
    this.routerPath.navigate([`/ionic/albumes/edit/${this.album.id}/${this.userId}/${this.token}`])
  }

  goToJoinCancion(){
    this.routerPath.navigate([`/ionic/albumes/join/${this.album.id}/${this.userId}/${this.token}`])
  }

  eliminarAlbum(){
    this.deleteAlbum.emit(this.album.id)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlbumShareComponent, {
      width: '250px',
      data: {
        users_names: this.users_names,
        album_id: this.album.id,
        titulo: this.album.titulo,
        userId: this.userId,
        token: this.token
      }
    });
  }

  getUsuariosCompartidos():void {
    if (this.album !== undefined) {
      this.albumService.getUsuariosCompartidos(this.album.id)
      .subscribe(compartidos => {
        this.mostrarCompartidosAlbum = compartidos
      },
      error => {
        console.log(error)
      })
    }

  }


}
