import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-educations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.scss',
})
export class EducationsComponent implements OnInit {
  public educationList: any = [];

  constructor(
    private about: AboutApiService
  ){

  }
  ngOnInit(): void {
    this.getEducationList();
  }

  getEducationList(){
    this.about.getEducationList().subscribe({
      next: (response) => {
        this.educationList = response;
      },
      error: (err) => {
        console.log("Error in education list loading: ", err.error.message);
      }
    });
  }
}
