import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userName = '';
  password = '';
  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
  constructor(private http1: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  loginClick = function() {
    this.http1.get(this.url).subscribe((res: any) => {
      const index = res.findIndex(e => e.email === this.userName);

      if (index !== -1 && res[index].password === this.password) {
        // console.log('Exists');
        // console.log('result: ', res[index]);
        this.router.navigate(['/home-page', this.userName]);
      } else {
        // console.log('index: ', index);
        // console.log(' Doesnot Exists');
        alert('Username or Password is not Correct');
      }
      });
};
}
