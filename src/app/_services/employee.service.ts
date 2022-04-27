import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employeesearch } from '../employee/employeesearch';
import { Employee } from '../_models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  searchEmployee(employeesearch: Employeesearch) :Observable<any> {
    return this.http.post(`http://localhost:8080/employee/searchEmployee`,employeesearch);
  }

  getAllEmployees():Observable<any> {
     return this.http.get(`http://localhost:8080/employee/getEmployeeList`);
  }
 // http: any;

  constructor(private http:HttpClient) { }
  
  employeeRegister(employee: Employee):Observable<any> {
    return this.http.post(`http://localhost:8080/employee/save`, employee);
}

employeeUpdate(employee: Employee):Observable<any> {
  return this.http.post(`http://localhost:8080/employee/updateEmployee`, employee);
}


employeeDelete(employee: Employee):Observable<any> {
return this.http.post(`http://localhost:8080/employee/deleteEmployee/${employee.empid}`, employee);

}
}
