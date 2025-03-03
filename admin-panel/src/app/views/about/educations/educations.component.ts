import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { CommonModule } from '@angular/common';
import { Education } from '../../../core/interfaces/education';
import { NgToastService } from 'ng-angular-popup';
import { Colors } from '../../notifications/toasters/toasters.component';
import { AuthService } from '../../../core/services/authentications/auth.service';

@Component({
  selector: 'app-educations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.scss',
})
export class EducationsComponent implements OnInit {
  public educationList: Education[] = [];
  loggedUserId: string | null;

  constructor(
    private about: AboutApiService,
    private toast: NgToastService,
    private auth: AuthService
  ) {
    this.loggedUserId = this.auth.getUserIdFromToken();
  }
  ngOnInit(): void {
    this.getEducationList();
  }

  getEducationList() {
    this.about.getEducationList().subscribe({
      next: (response) => {
        this.educationList = response;
      },
      error: (err) => {},
    });
  }

  deleteEducation(educationId: string) {
    if (educationId != null) {
      this.educationList = this.educationList.filter(
        (edu) => edu.educationId !== educationId
      );

      this.about
        .deleteEducation(educationId, this.loggedUserId)
        .subscribe({
          next: () => {
            this.toast.success(Colors.success, 'Deleted', 2000);
          },
          error: () => {
            this.getEducationList();
            this.toast.danger(Colors.danger, 'Failed to delete', 2000);
          },
        });
    }
  }
}
