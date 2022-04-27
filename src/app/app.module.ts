import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FakeBackendInterceptor, fakeBackendProvider } from './_helpers/fake-backend';
import { LoginComponent } from './login//login.component';
import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { AlertComponent } from './component/alert/alert.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ErrorComponent } from './error/error.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeesearchComponent } from './employeesearch/employeesearch.component';
//import { EmployeesearchComponent } from './employee/employeesearch/employeesearch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    EmployeeComponent,
    ErrorComponent,
    UpdateEmployeeComponent,
    MenuComponent,
    EmployeesearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,FormsModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
