import { Component, EventEmitter, Input, Output, AfterViewInit, OnChanges, SimpleChanges, viewChild, ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService, taskDetaills, userDetaills } from '../../common.service';
declare var bootstrap: any;

@Component({
  selector: 'app-add-trip-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-trip-modal.component.html',
  styleUrls: ['./add-trip-modal.component.css'],
})
export class AddTripModalComponent implements AfterViewInit, OnChanges {

  reactiveForm: FormGroup;
  @Input() modalTitle: string = 'Default Modal Title'; 
  @Input() showModal: boolean = false;  
  @Input() addTask: boolean = false
  @Output() save = new EventEmitter<void>();  
  @Output() cancel = new EventEmitter<void>();  
  @ViewChild('taskNameInput') taskNameInput!:ElementRef
  @ViewChild('taskBudgetInput') taskBudgetInput!:ElementRef
  @ViewChild('taskDescriptionInput') taskDescriptionInput!:ElementRef
  formStatus: string = '';
  formdata: any = {};
  userDetaillsArray:Array<object> = [];
  userDetaill:object = {};
  taskDetails: Array<string | number> = [];
  taskData: any;

 
  constructor(private fb: FormBuilder, public commonService: CommonService) {
    // Initialize the reactive form for user details
    this.reactiveForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''], // Ensure valid email format
      budget: ['', [Validators.required, Validators.min(0)]],
      tripDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }

  
  ngOnInit()  { 
  }

  private modalInstance: any;  
  private modalElement: any;   
  public userDetailsArray = [];

  ngAfterViewInit(): void {
    this.modalElement = document.getElementById('commonModal');
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement, {
        backdrop: false // 
      });
    }
  }
  

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['showModal'] && this.modalInstance) {
      if (this.showModal) {
        this.modalInstance.show();  
      } else {
        this.modalInstance.hide(); 
      }
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.cancel.emit();  
    } 
  }

  onSave() {
    this.save.emit();  
    if (this.reactiveForm.valid) {
      if(!this.addTask){
      this.userDataToCommonService()
      this.closeModal();
      }
    } else {
      console.log('Form is invalid');
    }
    if (this.addTask) {
      this.closeModal();
      let taskName: string = this.taskNameInput.nativeElement.value;
      let taskAmount: number = this.taskBudgetInput.nativeElement.value; 
      let taskDescription: string = this.taskDescriptionInput.nativeElement.value;
      this.taskData = new taskDetaills(taskName, taskAmount, taskDescription);
      this.commonService.userTaskDetails(this.taskData)
    }
    
   
  }
  
  userDataToCommonService() {
    if(!this.addTask) {
     this.userDetaill = new userDetaills(
      this.reactiveForm.value.firstName,
      this.reactiveForm.value.lastName,
      this.reactiveForm.value.budget,
      this.reactiveForm.value.tripDate,
      this.reactiveForm.value.email,
      this.reactiveForm.value.endDate);
      this.userDetaillsArray.push(this.userDetaill);
      this.commonService.updateUserDetails(this.userDetaillsArray)
  }
  }

  onCancel() {
    this.cancel.emit();  
    this.closeModal(); 
  }
}
