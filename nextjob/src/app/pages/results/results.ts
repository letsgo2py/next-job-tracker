import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class ResultsComponent {

  jobs: any[] = [];
  selectedJob: any = null;
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {
    const nav = history.state;
    this.jobs = nav.jobs || [];
  }

  ngOnInit() {
    window.addEventListener('focus', this.onWindowFocus);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  applyToJob(job: any) {
    this.selectedJob = job;

    window.open(job.applyLink, '_blank');
  }

  onWindowFocus = () => {
    console.log("Focus triggered");
    console.log("selectedJob:", this.selectedJob);
    if (this.selectedJob) {
      this.showModal = true;
      this.selectedJob = null; // reset
    }
  };

  saveApplication(job: any) {

    const applicationData = {
      jobId: job.id,
      company: job.company,
      position: job.title,
      userId: localStorage.getItem('userId') 
    };

    this.applicationService.applyToJob(applicationData)
      .subscribe({
        next: () => {
          alert('Application saved successfully!');
        },
        error: (err) => {
          if (err.status === 400) {
            alert('You already applied to this job.');
          } else {
            console.error('Error saving application', err);
          }
        }
      });
  }

  closeModal() {
    this.showModal = false;
  }

  confirmApplication() {
    if (this.selectedJob) {
      this.saveApplication(this.selectedJob);
    }
    this.closeModal();
  }

  ngOnDestroy() {
    window.removeEventListener('focus', this.onWindowFocus);
  }

}