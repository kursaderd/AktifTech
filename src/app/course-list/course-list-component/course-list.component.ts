import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDetailModel } from 'src/app/models/course-detail-model';
import { CourseService } from 'src/app/services/course.service';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCourseService } from 'src/app/services/users-course.service';
import { UsersCourseModel } from 'src/app/models/users-course-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'instructor', 'actions'];
  userId: string | null = null;
  dataSource: MatTableDataSource<CourseDetailModel> = new MatTableDataSource();
  public courseList: CourseDetailModel[] = [];
  

  constructor(private courseService: CourseService, public dialog: MatDialog, private router: Router, private authService:AuthService,private usersCourseService: UsersCourseService, private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    console.log(this.userId);
    
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      data => {
        this.courseList = data;
        this.dataSource.data = this.courseList;
      },
      error => {
        this.snackBar.open('İşlem başarısız.', 'Kapat', { duration: 3000 });
      }
    );

  }
  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => this.getCourses());
  }
  openAddEditDialog(course?: CourseDetailModel): void {
    const dialogRef = this.dialog.open(CourseAddEditComponent, {
      width: '500px',
      height: '750px',
      data: course || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (course) {
          debugger;
          this.courseService.updateCourse(course.id, result).subscribe(() => this.getCourses());
        } else {
            debugger;
          this.courseService.createCourse(result).subscribe(() => this.getCourses());
        }
      }
    });
  }
  enrollInCourse(courseId: number): void {
    const newUserCourse: UsersCourseModel = {
      courseId: courseId,
      userId: +this.userId
    };

    this.usersCourseService.createUserCourse(newUserCourse).subscribe(
      () => {
        this.snackBar.open('Kursa başarıyla kaydolundu.', 'Kapat', { duration: 3000 });
      },
      error => {
        this.snackBar.open('Kursa kaydolma başarısız oldu.', 'Kapat', { duration: 3000 });
      }
    );
  }
  viewCourseDetail(course: any): void {
    this.router.navigate(['/course', course.id]);
  }
}
