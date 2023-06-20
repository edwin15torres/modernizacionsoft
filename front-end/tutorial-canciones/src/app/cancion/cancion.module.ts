import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancionListComponent } from './cancion-list/cancion-list.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionCreateComponent } from './cancion-create/cancion-create.component';
import { CancionEditComponent } from './cancion-edit/cancion-edit.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DuracionPipe } from './pipes/duracion.pipe';
import { CancionShareComponent } from './cancion-share/cancion-share.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, DuracionPipe, CancionShareComponent],
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, FormsModule, MatDialogModule
  ],
  exports:[CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent]
})
export class CancionModule { }
