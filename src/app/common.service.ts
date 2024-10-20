import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';


export class userDetaills {
  constructor(
    public firstName: string,
    public lastName: string,
    public budgetAmount: number,
    public tripDate: Date,
    public emailId: string,
    public endDate: string
    ) {}
}


export class taskDetaills {
  constructor(
    public taskName: string,
    public taskAmount: number,
    public taskDescription: string
    ) {}
}

@Injectable({
  providedIn: 'root'
})

export class CommonService {
addTask:boolean = false;

constructor() { }

public user = new Subject()
userDetails = this.user.asObservable()

public task = new Subject()
taskDetails = this.task.asObservable()


updateUserDetails(userDetaills:Array<object>){
 this.user.next(userDetaills);
}
userTaskDetails(taskDetails:Array<object>){
  this.task.next(taskDetails);
 }
}
