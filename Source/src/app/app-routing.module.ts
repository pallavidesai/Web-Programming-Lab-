import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent},
  { path: 'register-page', component: RegisterPageComponent},
  { path: 'add-courses/:id', component: AddCoursesComponent},
  { path: 'home-page/:id', component: HomePageComponent},
  { path: 'calendar' , component: CalendarComponent},
  { path: 'profile-page/:id' , component: ProfilePageComponent},
  { path: 'edit-courses/:id', component: EditCoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
