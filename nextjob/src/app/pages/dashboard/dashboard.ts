import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  applications: any[] = [];
  totalApplied = 0;
  rejected = 0;
  accepted = 0;
  pending = 0;

  isLoading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.totalApplied = data.totalApplied;
        this.rejected = data.rejected;
        this.accepted = data.accepted;
        this.pending = data.pending;

        this.applications = data.applications || [];

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}