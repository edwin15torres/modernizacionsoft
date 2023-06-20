import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioSignupComponent],
  imports: [
    CommonModule, 
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule, 
    UsuarioRoutingModule
  ],
  exports: [UsuarioLoginComponent, UsuarioSignupComponent]
})
export class UsuarioModule { }
