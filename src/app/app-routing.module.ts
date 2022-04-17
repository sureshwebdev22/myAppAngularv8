import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [ { path: '', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },

{ path: 'employee', component: EmployeeComponent },

{ path: 'errorPage', component: ErrorComponent },

{path: 'updateEmployee',component:UpdateEmployeeComponent},

// otherwise redirect to home
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
