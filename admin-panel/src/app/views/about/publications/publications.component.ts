import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Publication } from '../../../core/interfaces/publication';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent {
  public publicationList: Publication[] = [];
  constructor(private about: AboutApiService) {
    this.getPublicationList();
  }

  getPublicationList() {
    this.about.getPublicationList().subscribe({
      next: (response) => {
        console.log('Publication list : ', response);
        this.publicationList = response;
      },
      error: (err) => {
        console.log('Errr while loading publication list');
      },
    });
  }

  getPublicationKeys(keys: any): string {
    if (!keys || !Array.isArray(keys)) {
      return '';
    }

    return keys
      .map((s: any, index: number) => `${index + 1}. ${s.key}`)
      .join('<br/><br/>');
  }
}
