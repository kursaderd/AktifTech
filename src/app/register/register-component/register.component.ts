import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/models/user-login-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public userLogin :UserLoginModel = {};
  registerForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required,]],
      surname: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

   onSubmit(): void {
    if (this.registerForm.valid) {
      this.userLogin = this.registerForm.value;
      this.authService.register(this.userLogin).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => console.error('Registration failed', error)
      );
    } else {
      console.error('Form is not valid');
    }
  }
}