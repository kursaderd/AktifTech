import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/models/user-login-model';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userLogin :UserLoginModel = {};
  loginForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: [''],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

   onSubmit(): void {
    if (this.loginForm.valid) {
      this.userLogin = this.loginForm.value;
      this.authService.login(this.userLogin).subscribe(
        response => {
          this.snackBar.open('Giriş işlemi başarılı', 'Close', { duration: 3000, verticalPosition:'top', horizontalPosition:'right' });
          this.router.navigate(['/course-list']);
        },
        error => {
          this.snackBar.open('Giriş işlemi başarısız', 'Close', { duration: 3000, verticalPosition:'top', horizontalPosition:'right'  });
        }
      );
    } else {
      this.snackBar.open('Form doldurma işlemi başarısız', 'Close', { duration: 3000, verticalPosition:'top', horizontalPosition:'right'  });
    }
   }
  public async register() {
    this.router.navigate(['/register']);
  }
}
