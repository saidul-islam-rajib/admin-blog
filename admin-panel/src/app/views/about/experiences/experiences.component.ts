import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/interfaces/experience';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentications/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Colors } from '../../notifications/toasters/toasters.component';

@Component({
  selector: 'app-experiences',
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent implements OnInit {
  loggedUserId: string | null;
  public experienceList: Experience[] = [];
  constructor(
    private about: AboutApiService, 
    private router: Router,
    private auth: AuthService,
    private toast: NgToastService
  ) {    
    this.loggedUserId = this.auth.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.getExperienceList();
  }

  getExperienceList() {
    this.about.getExperienceList().subscribe({
      next: (response) => {
        this.experienceList = response;
      },
      error: (err) => {},
    });
  }

  getSectionDescriptions(section: any): string {
    if (!section || !Array.isArray(section)) {
      return '';
    }
    return section
      .map((s: any, index: number) => `${index + 1}. ${s.sectionDescription}`)
      .join('<br/>');
  }

  deleteExperience(experienceId: any) {
    if (experienceId != null) {
      this.experienceList = this.experienceList.filter(
        (exp) => exp.experienceId !== experienceId
      );
    }

    this.about.deleteExperience(experienceId, this.loggedUserId)
    .subscribe({
      next: () => {
        this.toast.success(Colors.success, 'Deleted', 2000);
      },
      error: () => {
        this.getExperienceList();
        this.toast.danger(Colors.danger, 'Failed to delete', 2000);
      },
    });
  }
  updateExperienceInformation(experience: any) {
    const experienceId = experience.experienceId;
    this.router.navigate(['/experience/edit/' + experienceId]);
  }
}
