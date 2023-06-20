import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get session(){
     return this.usuarioServicio.session;
  }

  constructor(
    private router: Router,
    private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
  }

  cerrarSession(){
    this.usuarioServicio.cerrarSession();
    this.router.navigate(['/auth']);
  }

}
