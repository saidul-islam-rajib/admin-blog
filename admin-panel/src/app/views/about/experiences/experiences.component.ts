import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/interfaces/experience';

@Component({
  selector: 'app-experiences',
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent implements OnInit {
  public experienceList: Experience[] = [];
  constructor(private about: AboutApiService) {
    this.getExperienceList();
  }
  ngOnInit(): void {}

  getExperienceList() {
    console.log('Experience method is called');
    this.about.getExperienceList().subscribe({
      next: (response) => {
        console.log('Experience response: ', response);
        this.experienceList = response;
      },
      error: (err) => {
        console.log('Error in experience list loading: ', err.error.message);
      },
    });
  }

  getSectionDescriptions(section: any): string {
    if (!section || !Array.isArray(section)) {
      return '';
    }
    return section
    .map((s: any, index: number) => `${index + 1}. ${s.sectionDescription}`)
    .join('<br/><br/>');
  }


}
