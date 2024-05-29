import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetailModel } from 'src/app/models/course-detail-model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit{
  course: CourseDetailModel
  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() { 
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourse(id).subscribe((data: any) => {
      this.course = data;
    });
  }
}

