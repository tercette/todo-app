import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterial } from './tasks/angular-material.module.ts/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListPageComponent } from '../app/tasks/pages/task-list-page/task-list-page.component';
import { TaskFormPageComponent } from './tasks/pages/task-form-page/task-form-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatConfirmDialogComponent } from '../app/tasks/business-rules/mat-confirm-dialog/mat-confirm-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    TaskListPageComponent,
    TaskFormPageComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterial,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaskListPageComponent, MatConfirmDialogComponent]
})
export class AppModule { }
