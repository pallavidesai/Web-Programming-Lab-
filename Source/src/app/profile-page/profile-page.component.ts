import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  firstName = '';
  lastName = '';
  // userName = '';
  email = '';
  phonenumber = '';
  password = '';
  mailId = '';
  id = '';
  index = '';
  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
  constructor(private route: ActivatedRoute, private http1: HttpClient, private router: Router) { }

  ngOnInit() {
    this.mailId = this.route.snapshot.params['id'];
    console.log('mailid', this.mailId);
    this.http1.get(this.url).subscribe((res: any) => {
      this.index = res.findIndex(e => e.email === this.mailId);
      this.id = res[this.index]._id['$oid'];
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + this.id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
      console.log('id', this.id);
      console.log(res[this.index]);

      this.firstName = res[this.index].firstName;
      this.lastName = res[this.index].lastName;
      this.password = res[this.index].password;
      this.phonenumber = res[this.index].number;
      this.email = res[this.index].email;
      });
  }

  Hompage = function() {
    this.router.navigate(['/home-page',  this.route.snapshot.params['id']]);
  };
  SignOut = function() {
    this.router.navigateByUrl('/login-page');
  };
  ProfileSave = function() {
    this.http1.get(this.url).subscribe((res: any) => {
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + this.id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';

      res[this.index].firstName = this.firstName;
      res[this.index].lastName = this.lastName;
      res[this.index].password = this.password;
      res[this.index].number = this.phonenumber ;
      res[this.index].email = this.email;
      console.log('credits' , res[this.index]);

      const values = { $set : res[this.index]} ;
      this.http1.put(url1 + '&q={' + '_id:' + this.id + '}', values).subscribe((putResult: any) => {
        console.log(putResult);
        this.router.navigate(['/home-page', this.mailId]);
        });
      });
  };
}
