import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Interest } from '../../../core/interfaces/interest'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interests',
  imports: [CommonModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  public interestList: Interest[] = [];
  constructor(
    private about: AboutApiService
  ){
    this.getInterestList();
  }
  getInterestList() {
    this.about.getInterestList().subscribe({
      next: (response) => {
        this.interestList = response;
      },
      error: (err) => {
        console.log('Error in interest list loading: ', err.error.message);
      },
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
}
