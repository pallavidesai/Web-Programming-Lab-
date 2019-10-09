import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  firstName = '';
  lastName = '';
  // userName = '';
  email = '';
  phonenumber = '';
  password = '';
  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';

  constructor(private http1: HttpClient, private router: Router ) { }

  ngOnInit() {
  }
  signupClick = function() {
    this.http1.get(this.url).subscribe((getResult: any) => {
      const index = getResult.findIndex(e => e.email === this.email);
      if (index === -1) {
        const values =  { firstName : this.firstName, lastName : this.lastName,
          password : this.password, email : this.email,
          number : this.phonenumber, } ;
        this.http1.post( this.url, values).subscribe((postResult: any) => {
          console.log(postResult._id['$oid']);
          this.router.navigate(['/add-courses', this.email]);
          });
      } else {
        alert('Email already exists');
      }
      });
    // this.router.navigateByUrl('/add-courses');
};
}
