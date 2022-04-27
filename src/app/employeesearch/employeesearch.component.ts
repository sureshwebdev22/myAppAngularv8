import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employeesearch',
  templateUrl: './employeesearch.component.html',
  styleUrls: ['./employeesearch.component.css']
})
export class EmployeesearchComponent implements OnInit {

  employeename1: string;
  employeeSearchForm: FormGroup;
  submitted = false;
  searchCriterias: any = ['', 'contains', 'equals', 'startswith', 'endswith'];
  employees: any = [];
  employees1: any = [];

  no_records_search_flag = false;
  noRecordFromDbFlag = false;
  p: Number = 1;
  count: Number = 3;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    //  this.searchCriterias=['A','B']
    this.employeeSearchForm = new FormGroup({
      searchTextBox: new FormControl('', [Validators.required]),
      searchCriteriaControl: new FormControl('', [Validators.required, this.searchCriteriasControlValidate])
    });

  }
  get employeeSearchFormControls() {
    return this.employeeSearchForm.controls;
  }

  searchCriteriasControlValidate(control: FormControl) {
    if (control.value === '') {

      return { customerror: { error: "plz select" } };
    }
  }


  onSubmit() {
    this.submitted = true;

    this.noRecordFromDbFlag = false;

    if (this.employeeSearchForm.invalid) {
      return;
    }

    this.employeeService.searchEmployee(this.employeeSearchForm.value).subscribe(
      data => {

        this.employees = data;
        //  console.log('employees ->'  )
        //alert(this.employees.length)
        this.employees1 = data;
        if (this.employees.length === 0) {
          this.noRecordFromDbFlag = true;
        }

      },
      error => {

      }
    );

  }

  myFunction(value: String): string {

    return value.toLocaleUpperCase();
  }
  one = false;
  no_records_flag = false;
  Search() {
    //   this.employees=this.employees1;
    // this.employees1=this.employees;
    this.no_records_search_flag = false;

    this.p = 0;
    this.employees = this.employees1;
    this.employees = this.employees.filter(res => {

      return res.employeename.toLocaleUpperCase().match(this.employeename1.toLocaleUpperCase());
    })

    if (this.employees.length === 0) {
      // alert('inside')
      this.employees = this.employees1;

      this.no_records_search_flag = true;

    }

  }

  key: any = 'employeename';
  reverse: boolean = false;
  sort(key: string) {

    this.key = key;
    this.reverse = !this.reverse;
  }


}
