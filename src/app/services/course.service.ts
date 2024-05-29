import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { UserLoginModel } from '../models/user-login-model';
import { CourseDetailModel } from '../models/course-detail-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'https://localhost:7145/Api/Course'
    constructor(private http: HttpClient) {}

    getCourses(): Observable<CourseDetailModel[]> {
      return this.http.get<CourseDetailModel[]>(this.apiUrl);
    }
  
    getCourse(id: number): Observable<CourseDetailModel> {
      return this.http.get<CourseDetailModel>(`${this.apiUrl}/${id}`);
    }
  
    createCourse(course: CourseDetailModel): Observable<CourseDetailModel> {
      return this.http.post<CourseDetailModel>(this.apiUrl, course);
    }
  
    updateCourse(id: number, course: CourseDetailModel): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, course);
    }
  
    deleteCourse(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}