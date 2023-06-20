import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';


import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home-routing.module';
import { AlbumModule } from '../album/album.module';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HomeComponent,
    InicioComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HomeRoutingModule,
    AlbumModule
  ],
  exports: [
    HomeComponent
  ]
})
export class AppHomeModule { }
