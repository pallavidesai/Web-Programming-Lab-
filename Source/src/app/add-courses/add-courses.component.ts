import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  courseName = '';
  courseCategory = '';
  credits = '';
  examDate = '';
  midTermDate = '';

  url = 'https://api.mlab.com/api/1/databases/htata/collections/weblab?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
  constructor(private route: ActivatedRoute, private http1: HttpClient, private router: Router) { }
  ngOnInit() {
  }

  SaveClick = function() {
    const mailId = this.route.snapshot.params['id'];
    console.log('mailid', mailId);
    this.http1.get(this.url).subscribe((res: any) => {
      const index = res.findIndex(e => e.email === mailId);
      const id = res[index]._id['$oid']
      const url1 = 'https://api.mlab.com/api/1/databases/htata/collections/weblab/' + id + '?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';
      console.log(id);
      console.log(res[index].courses);
      const coursesublist = [{coursename : this.courseName, courseCategory: this.courseCategory,
        credits : this.credits , examDate: this.examDate , midTermDate: this.midTermDate}];

      if ( res[index].courses !== undefined) {
        res[index].courses = res[index].courses.concat(coursesublist);
        console.log(res[index].courses);
      } else {
        res[index].courses = coursesublist;
      }
      console.log(coursesublist);


      const values = { $set : { firstName : res.firstName, lastName : res.lastName,
        password : res.password, email : res.email,
        number : res.phonenumber, courses : res[index].courses }
      } ;
      // const values = { $set : { "courses.$.courseName.$" : this.courseName } };
      this.http1.put(url1 + '&q={' + '_id:' + id + '}', values).subscribe((putResult: any) => {
        console.log(putResult);
        });
      this.courseName = '';
      this.courseCategory = '';
      this.credits = '';
      this.examDate = '';
      this.midTermDate = '';
      });
  };

  DoneClick = function() {
    this.router.navigateByUrl('/login-page');
  };

}
