import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseDetailModel } from 'src/app/models/course-detail-model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent implements OnInit {
  public courseModel: CourseDetailModel;
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDetailModel
  ) {
    this.courseForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      instructor: [data?.instructor || '', [Validators.required]],
      content: [data?.content || '', [Validators.required]],
      duration: [data?.duration || '', [Validators.required]],
      difficultyLevel: [data?.difficultyLevel || '', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
