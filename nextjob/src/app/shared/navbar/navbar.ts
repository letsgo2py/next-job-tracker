import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(private router: Router, 
    public authService: AuthService,
  ) {}

  goHome() {
    this.router.navigate(['/']);
  }

  goResults() {
    this.router.navigate(['/results']);
  }

  goDashboard(){
    this.router.navigate(['/dashboard']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}