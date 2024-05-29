import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AktifTech';
  constructor(private router :Router, private authService:AuthService) { }

  ngOnInit() { }
  logout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
  routeToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  home(){
    this.router.navigate(['/course-list'])
  }
}
