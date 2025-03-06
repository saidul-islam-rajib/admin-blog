import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Interest } from '../../../core/interfaces/interest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Colors } from '../../notifications/toasters/toasters.component';
import { AuthService } from '../../../core/services/authentications/auth.service';

@Component({
  selector: 'app-interests',
  imports: [CommonModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  public interestList: Interest[] = [];
  loggedUserId: string | null;

  constructor(
    private about: AboutApiService,
    private router: Router,
    private toast: NgToastService,
    private auth: AuthService
  ) {
    this.getInterestList();
    this.loggedUserId = this.auth.getUserIdFromToken();
  }
  getInterestList() {
    this.about.getInterestList().subscribe({
      next: (response) => {
        this.interestList = response;
      },
      error: (err) => {},
    });
  }

  getInterestKeys(keys: any): string {
    if (!keys || !Array.isArray(keys)) {
      return '';
    }
    return keys
      .map((s: any, index: number) => `${index + 1}. ${s.key}`)
      .join('<br/>');
  }

  updateInterest(interest: any) {
    const interestId = interest.interestId;
    this.router.navigate(['/interest/edit/' + interestId]);
  }
  deleteInterest(interestId: any) {
    if (interestId != null) {
      this.interestList = this.interestList.filter(
        (edu) => edu.interestId !== interestId
      );

      this.about.deleteInterest(interestId, this.loggedUserId).subscribe({
        next: () => {
          this.toast.success(Colors.success, 'Deleted', 2000);
        },
        error: () => {
          this.getInterestList();
          this.toast.danger(Colors.danger, 'Failed to delete', 2000);
        },
      });
    }
  }
}
