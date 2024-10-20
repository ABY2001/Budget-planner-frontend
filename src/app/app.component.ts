import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftNavbarComponent } from './left-navbar/left-navbar.component';
import { HeadNavbarComponent } from "./head-navbar/head-navbar.component";
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftNavbarComponent, HeadNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'budget-app';
}
