import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Publication } from '../../../core/interfaces/publication';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/authentications/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Colors } from '../../notifications/toasters/toasters.component';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent {
  public publicationList: Publication[] = [];
  loggedUserId: string | null;
  constructor(
    private about: AboutApiService,
    private auth: AuthService,
    private toast: NgToastService
  ) {
    this.getPublicationList();
    this.loggedUserId = this.auth.getUserIdFromToken();
  }

  getPublicationList() {
    this.about.getPublicationList().subscribe({
      next: (response) => {
        this.publicationList = response;
      },
      error: (err) => {
      },
    });
  }

  getPublicationKeys(keys: any): string {
    if (!keys || !Array.isArray(keys)) {
      return '';
    }

    return keys
      .map((s: any, index: number) => `${index + 1}. ${s.key}`)
      .join('<br/>');
  }

  deletePublication(publicationId: any){
    if (publicationId != null) {
      this.publicationList = this.publicationList.filter(
        (x) => x.publicationId !== publicationId
      );

      this.about.deleteInterest(publicationId, this.loggedUserId).subscribe({
        next: () => {
          this.toast.success(Colors.success, 'Deleted', 2000);
        },
        error: () => {
          this.getPublicationList();
          this.toast.danger(Colors.danger, 'Failed to delete', 2000);
        },
      });
    }
  }
}
