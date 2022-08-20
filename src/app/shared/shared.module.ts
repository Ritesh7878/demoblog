import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { SafeHtmlPipe } from './safe-html.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxEditorModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    RouterModule,
    FormsModule,
    NgxEditorModule,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
