import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent {

  jobForm: FormGroup;
  selectedTech: string[] = [];

  jobs: any[] = [];
  isLoading = false;

  techOptions = ['Angular','React','Vue','Node.js','Java','Python','.NET','TypeScript','Go','Kotlin','Swift','Rust'];
  locationOptions = ['United States','United Kingdom','Canada','Germany','India','Australia','Netherlands','Singapore','France','Brazil','Other'];
  workModeOptions = ['Remote','Hybrid','On-Site'];

  constructor(private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.jobForm = this.fb.group({
      experience: [null, [Validators.required, Validators.min(0)]],
      techStack:  [[], Validators.required],
      location:   ['', Validators.required],
      workMode:   ['', Validators.required],
      visa:       [false]
    });
  }

  toggleTech(tech: string) {
    const idx = this.selectedTech.indexOf(tech);
    if (idx > -1) this.selectedTech.splice(idx, 1);
    else this.selectedTech.push(tech);
    this.jobForm.get('techStack')!.setValue(this.selectedTech.length ? this.selectedTech : []);
  }

  isTechSelected(tech: string): boolean {
    return this.selectedTech.includes(tech);
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.isLoading = true;
      const payload = this.jobForm.value;

      this.homeService.searchJobs(payload).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.jobs = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('API Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}