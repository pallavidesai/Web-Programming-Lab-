import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddCoursesComponent,
    HomePageComponent,
    CalendarComponent,
    ProfilePageComponent,
    EditCoursesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
