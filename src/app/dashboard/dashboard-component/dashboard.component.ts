import { Component, OnInit } from '@angular/core';
import { UsersCourseModel } from '../../models/users-course-model';
import { CourseDetailModel } from '../../models/course-detail-model';
import { UsersCourseService } from '../../services/users-course.service';
import { AuthService } from '../../services/auth.service';
import { data } from 'autoprefixer';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  progressValue: number = 75;
  userId: any | null = null;
  userCourses: UsersCourseModel[] = [];
  courses :CourseDetailModel;
  courseList:CourseDetailModel [] = [];
  constructor(private usersCourseService: UsersCourseService, private authService:AuthService, private courseService: CourseService){}

  ngOnInit(){
    this.userId = this.authService.getUserIdFromToken();
    this.getUserCourses();
  }
  
  getUserCourses(): void {
    debugger;
    this.usersCourseService.getUserCourses(this.userId).subscribe(
      data => {
        this.userCourses = data;
        console.log(this.userCourses);
        for (let i = 0; i < this.userCourses.length; i++) {
          const element = this.userCourses[i];
          this.courseService.getCourse(element.courseId).subscribe(
            res => { 
              this.courseList.push(res);
              console.log(this.courseList);
              
            }
          )
          
        }
      },
      error => console.error('Error fetching user courses', error)
      
    );
    console.log(this.userCourses);

  }
}
