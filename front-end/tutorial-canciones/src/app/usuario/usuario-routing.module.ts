import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';



const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'signin',
        component: UsuarioLoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: UsuarioSignupComponent,
        pathMatch: 'full'
      },
      {
        path:'**',
        redirectTo:'signin'
      }
    ]  
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsuarioRoutingModule { }
