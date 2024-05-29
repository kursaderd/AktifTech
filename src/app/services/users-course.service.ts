import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersCourseModel } from '../models/users-course-model';

@Injectable({
  providedIn: 'root'
})
export class UsersCourseService {
  private apiUrl = 'http://localhost:5160/api/userscourses';

  constructor(private http: HttpClient) {}

  getUserCourses(userId: number): Observable<UsersCourseModel[]> {
    return this.http.get<UsersCourseModel[]>(`${this.apiUrl}/${userId}`);
  }

  createUserCourse(usersCourse: UsersCourseModel): Observable<UsersCourseModel> {
    return this.http.post<UsersCourseModel>(this.apiUrl, usersCourse);
  }
}
