import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiences',
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent implements OnInit {
  public experienceList: any = [];
  constructor(
    private about: AboutApiService
  ){

  }
  ngOnInit(): void {
    this.getExperienceList();
  }


  getExperienceList() {
    console.log("Experience method is called")
    this.about.getExperienceList().subscribe({
      next: (response) => {
        console.log("Experience response: ", response)
        this.experienceList = response;
      },
      error: (err) => {
        console.log('Error in experience list loading: ', err.error.message);
      },
    });
  }
}
