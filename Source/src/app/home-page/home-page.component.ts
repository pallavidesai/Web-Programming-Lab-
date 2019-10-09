import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  coursesData = [];
  mailId = '';
  index = 0;
  id = '';
  course_index = '';
  // imageUrl = '';

  constructor(private route: ActivatedRoute, private http1: HttpClient, private router: Router) { }
  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
  ngOnInit() {

    this.mailId = this.route.snapshot.params['id'];
    this.http1.get(this.url).subscribe((res: any) => {
      this.index = res.findIndex(e => e.email === this.mailId);
      this.id = res[this.index]._id['$oid'];

      let _courses = res[this.index].courses;
      console.log(_courses);
      this.coursesData = Object.keys(_courses).map(function (k) {
        const i = _courses[k];
        const imageUrl = '../../assets/' + i.coursename + '.png';
        console.log(imageUrl);
        return {course: i.coursename, category: i.courseCategory, credits: i.credits, examDate: i.examDate,
          midTermDate: i.midTermDate, imageurl: imageUrl};
      });

    });
  }

  ViewProfile = function() {
    this.router.navigate(['/profile-page',  this.route.snapshot.params['id']]);
  };
  Hompage = function() {
    this.router.navigate(['/home-page',  this.route.snapshot.params['id']]);
  };
  SignOut = function() {
    this.router.navigateByUrl('/login-page');
  };

  EditCourses = function(courses) {
    console.log(courses);
    this.router.navigate(['/edit-courses',  this.route.snapshot.params['id'] + '&' + courses.course]);
  };

  DeleteCourses = function(courses) {
    console.log(courses);
    this.http1.get(this.url).subscribe((res: any) => {
      this.course_index = res[this.index].courses.findIndex(x => x.coursename === courses.course);
      console.log('this.course_index', this.course_index);
      console.log('this.id', this.id);
      if (this.course_index !== -1) {
        res[this.index].courses.splice(this.course_index, 1);
      }
      console.log(res[this.index]);
      const values = { $set : res[this.index] } ;
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + this.id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
      this.http1.put(url1 + '&q={' + '_id:' + this.id + '}', values).subscribe((putResult: any) => {
        console.log(putResult);
        window.location.reload();
        });
      });
  };
}
