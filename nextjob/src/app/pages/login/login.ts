import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

import { ToastComponent } from '../../shared/toast/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  name = '';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  isRegisterMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log("LoginComponent loaded");

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    console.log("register MODe: in toggle", this.isRegisterMode);
  }

  onSubmit(event?: Event) {
    console.log("Form submitted");
    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Invalid credentials');
      }
    });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  
  register() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.showNotification('Registration successful! Please login now.', 'success');
        this.isRegisterMode = false;
        console.log("Successfully saved user")
        console.log("isRegisterMode", this.isRegisterMode);
      },
      error: () => alert('Registration failed')
    });
  }
}