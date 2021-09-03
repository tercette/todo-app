import { AngularMaterial } from './angular-material.module.ts/angular-material.module';
import { Component, NgModule } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
}
