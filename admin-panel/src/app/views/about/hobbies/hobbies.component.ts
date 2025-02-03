import { Component, OnInit } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { AdditionalSkill } from '../../../core/interfaces/additional-skill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
})
export class HobbiesComponent implements OnInit {
  public hobbyList: AdditionalSkill[] = [];
  constructor(
    private about: AboutApiService
  ) {
    this.getHobbyList();
  }

  ngOnInit(): void {}

  getHobbyList() {
    this.about.getAdditionalSkillList().subscribe({
      next: (response) => {
        this.hobbyList = response;
      },
      error: (err) => {
        console.log('Error in hobby list loading: ', err.error.message);
      },
    });
  }

  getKeys(keys: any): string {
    if (!keys || !Array.isArray(keys)) {
      return '';
    }
    return keys
      .map((s: any, index: number) => `${index + 1}. ${s.key}`)
      .join('<br/><br/>');
  }
}
