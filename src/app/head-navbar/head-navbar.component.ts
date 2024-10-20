import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';
import { HeadNavbar } from './head-navbar';



@Component({
  selector: 'app-head-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './head-navbar.component.html',
  styleUrl: './head-navbar.component.css',
})
export class HeadNavbarComponent {
  userArray: HeadNavbar[] = []; 
  budgetSubscription: any;
  userDetailsArr:HeadNavbar[] = []

   constructor(public commonService: CommonService) {} 
   ngOnInit() {
    if(!this.commonService.addTask) {
    this.getBudgetFromUserForm();
    }
  }
   
  getBudgetFromUserForm() {
    this.commonService.userDetails.subscribe((details: any) => { 
        this.userArray = [details[details.length-1]];
      });
     
  }
}
  
  
   

