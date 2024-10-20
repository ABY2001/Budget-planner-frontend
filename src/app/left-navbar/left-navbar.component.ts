import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-left-navbar',
  standalone: true,
  imports: [],
  templateUrl: './left-navbar.component.html',
  styleUrl: './left-navbar.component.css',
  providers: [CommonService]
})
export class LeftNavbarComponent {

}
