import { state } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { throwError } from 'rxjs';
import { first } from 'rxjs/operators';
import { Employee } from '../_models/employee';
import { ExceptionResponse } from '../_models/exception-response';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  error_object;
  employee: Employee;
  employees: Employee[];
  errorResponse: ExceptionResponse;
  employeeForm: FormGroup;
  submitted = false;
  countryList: any = ['Please select some value', 'india', 'pakistan', 'england'];

  designation: any = ['Please select some value', 'Developer', 'Tester', 'Businnes Analyst'];

  p: Number = 1;
  count: Number = 5;


  constructor(private employeeService: EmployeeService,private router:Router) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().pipe(first()).subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.log(error);
      }
    );
    this.employeeForm = new FormGroup({
      country: new FormControl('', [Validators.required, this.countryValidate]),
      employeename: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),

      designation: new FormControl('', [Validators.required, this.designationValidate]),
    });
  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }
  countryValidate(control: FormControl) {
    // alert(control.value)
    // this.submitted=true;
    if (control.value === 'Please select some value')
      return {
        customerror: { error: 'Please select some value' }
      }
  }

  designationValidate(control: FormControl) {
    // alert(control.value)
    if (control.value === 'Please select some value')
      return {
        customerror: { error: 'Please select some value' }
      }
  }


  onSubmit() {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    this.employeeService.employeeRegister(this.employeeForm.value).pipe(first()).subscribe(
      data => {
        this.employee = data;
        //this.employeeService
       // console.log("employee id" + data.empid);
        console.log("employee register starts-> " + this.employee)
        this.employeeService.getAllEmployees().pipe(first()).subscribe(
          data => {
            this.employees = data;
          },
          error => {
            console.log(error);
          }
        )
       
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
   /* this.employeeService.getAllEmployees().pipe(first()).subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.log(error);
      }
    )*/
    // alert('form valid');
  }

  updateEmployee(employee:Employee){
  //  alert(employee.employeename+' ' + employee.address);
    this.router.navigateByUrl("/updateEmployee",{state:employee}) ;
  }

  deleteEmployee(employee:Employee){
    this.employeeService.employeeDelete(employee).pipe().subscribe(
      data=>{
        console.log(data);
        this.employeeService.getAllEmployees().pipe(first()).subscribe(
          data => {
            this.employees = data;
          //  this.employeeForm=null;
           // window.location.reload();
           this.employeeForm.reset();
            this.submitted=false;
          // this.router.navigateByUrl("/employee") ;
          },
          error => {
            console.log(error);
          }
        )
      },
      error=>{
        console.log("delete error"+ error)
      }
    )
    //  alert(employee.employeename+' ' + employee.address);
    //  this.router.navigateByUrl("/deleteEmployee",{state:employee}) ;
    }

}
