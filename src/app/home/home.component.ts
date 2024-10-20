import { Component } from '@angular/core';
import { AddTripModalComponent } from './add-trip-modal/add-trip-modal.component';
import { CommonModule } from '@angular/common';
import { CommonService, userDetaills } from '../common.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTripModalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modalTitle: string = "Add Trip Budget";
  showModal = false;
  taskCardDetails:Array<any> = []
  userArray: Array<any> = [];
  taskIndexes:number = 0
  userDetaillsArray:Array<object> = [];
  userDetaill:object = {};
  budgetAmount:number = 0
  

  constructor(public commonService : CommonService) {

  }

  ngOnInit(){
    this.getUserDetailsFromCommonService()
   this.getTaskDetailsFromCommonService();
  //  this.updateTotalBudget();
  }

  openModal() {
    this.showModal = true;  // Show the modal
  }

  closeModal() {
    this.showModal = false;  // Hide the modal
  }

  onSave() {
    console.log('Saved!');
    this.closeModal();  // Close modal after saving
    this.commonService.addTask = true;
  }

  onCancel() {
    console.log('Cancelled!');
    this.closeModal();  
   }

   
   getTaskDetailsFromCommonService() {
    this.commonService.taskDetails.subscribe((task: any) => {
      if (task) {
        this.taskCardDetails.push(task); // Add task to array
        this.taskIndexes =  this.taskCardDetails.length - 1
        this.updateTotalBudget(); 
      }

    });
  }

  
   getUserDetailsFromCommonService() {
    this.commonService.userDetails.subscribe((details: any) => { 
      this.userArray.push(details[0]);
    });
   }
   updateTotalBudget() {
        this.budgetAmount = this.userArray[this.taskIndexes]?.budgetAmount - this.taskCardDetails[this.taskIndexes]?.taskAmount
    this.userDetaill = new userDetaills(
      this.userArray[0].firstName,
      this.userArray[0].lastName,
      this.budgetAmount,
      this.userArray[0].tripDate,
      this.userArray[0].emailId,
      this.userArray[0].endDate);
      this.userDetaillsArray.push(this.userDetaill);
      this.commonService.updateUserDetails(this.userDetaillsArray);
   }

}
