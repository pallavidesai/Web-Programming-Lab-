import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  coursename = ''; // this course name  is used for populatiing in html
  courseCategory = '';
  credits = '';
  examDate = '';
  midTermDate = '';
  mailId = '';
  course_name = ''; // after getting the course name which should be edited this is stored here
  index = 0;
  course_index= '';
  id = '';

  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
  constructor(private route: ActivatedRoute, private http1: HttpClient, private router: Router) { }
  ngOnInit() {
    this.http1.get(this.url).subscribe((res: any) => {
      let splitted_params = this.route.snapshot.params['id'].split('&');
      console.log('splitted_params', splitted_params);
      this.mailId = splitted_params[0];
      this.course_name = splitted_params[1];
      this.index = res.findIndex(e => e.email === this.mailId);
      this.id = res[this.index]._id['$oid']
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + this.id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
      console.log(this.course_name);

      // let _courses= res[this.index].courses;
      // console.log('courses', _courses[0].coursename);
      this.course_index = res[this.index].courses.findIndex(x => x.coursename === this.course_name);

      console.log('this.course_index', this.course_index);
      console.log('courses', res[this.index].courses[this.course_index]);

      this.coursename = res[this.index].courses[this.course_index].coursename;
      this.courseCategory = res[this.index].courses[this.course_index].courseCategory;
      this.credits = res[this.index].courses[this.course_index].credits;
      this.examDate = res[this.index].courses[this.course_index].examDate;
      this.midTermDate = res[this.index].courses[this.course_index].midTermDate;
      });
  }
  Hompage = function() {
    this.router.navigate(['/home-page',  this.mailId]);
  };
  ViewProfile = function() {
    this.router.navigate(['/profile-page',  this.mailId]);
  };
  SignOut = function() {
    this.router.navigateByUrl('/login-page');
  };
  UpdateClick = function() {
    this.http1.get(this.url).subscribe((res: any) => {
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + this.id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';

      res[this.index].courses[this.course_index].credits = this.credits;
      res[this.index].courses[this.course_index].coursename = this.coursename;
      res[this.index].courses[this.course_index].courseCategory = this.courseCategory;
      res[this.index].courses[this.course_index].examDate = this.examDate;
      res[this.index].courses[this.course_index].midTermDate = this.midTermDate;
      console.log('credits' , res[this.index].courses[this.course_index]);

      const values = { $set : { firstName : res.firstName, lastName : res.lastName,
        password : res.password, email : res.email,
        number : res.phonenumber, courses : res[this.index].courses }
      } ;
      this.http1.put(url1 + '&q={' + '_id:' + this.id + '}', values).subscribe((putResult: any) => {
        console.log(putResult);
        this.router.navigate(['/home-page', this.mailId]);
        });
      });
  };


}
