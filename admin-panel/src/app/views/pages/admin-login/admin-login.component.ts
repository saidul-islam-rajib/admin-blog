import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { AuthService } from '../../../core/services/authentications/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    console.log("login method is called")
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log("Login response:", response)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
        }
      })

      const loginData = this.loginForm.value;

      // this.http.post(environment.loginUrl, loginData).subscribe({
      //   next: (response) => {
      //     this.isLoading = false;

      //     console.log("Login response:", response)
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: (err) => {
      //     this.isLoading = false;
      //     this.errorMessage = err.error?.message || 'Login failed. Please try again.';

      //     this.router.navigate(['/404']);
      //   },
      // });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const registrationData = this.registerForm.value;

      this.http.post(environment.registerUrl, registrationData).subscribe({
        next: () => {
          this.isLoading = false;

          this.isLoginMode = true;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Registration failed. Please try again';
        },
      });
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
