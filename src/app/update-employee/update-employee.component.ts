import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee:Employee;
  employeeForm:FormGroup;
  submitted: boolean;
  error_object: any;
  countryList: any = ['Please select some value', 'india', 'pakistan', 'england'];
  designation: any = ['Please select some value', 'Developer', 'Tester', 'Businnes Analyst'];
  update_flag:boolean;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private employeeService:EmployeeService) {  console.log(this.router.getCurrentNavigation().extras.state);}

  ngOnInit() {
  this.employee=  history.state;
  console.log('employee' + this.employee + 'employename '+ this.employee.employeename)

  this.employeeForm = new FormGroup({
    empid:new FormControl(this.employee.empid),
    country: new FormControl(this.employee.country, [Validators.required]),
    employeename: new FormControl(this.employee.employeename, Validators.required),
    address: new FormControl(this.employee.address, Validators.required),

    designation: new FormControl(this.employee.designation, [Validators.required])
  });

    }

    onSubmit(){
      this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    this.employeeService.employeeUpdate(this.employeeForm.value).pipe(first()).subscribe(
      data => {
        this.employee = data;
        console.log("data" + data);
        console.log("employee data-> " + this.employee)
        this.update_flag=true;
      },
      error => {
        if(error instanceof HttpErrorResponse){
          if(error.status===0){
            this.router.navigate(["/errorPage"]);
            return;
          }
        }
        console.log(error);
        this.error_object = error;
        // alert(this.error_object.error.message)
        // return throwError(error.message);
      }
    );

    }
  
    
  }

  


