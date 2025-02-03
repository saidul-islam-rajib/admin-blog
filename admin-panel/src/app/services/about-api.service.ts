import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutApiService {
  private baseApiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  getEducationList() {
    return this.http.get<any>(`${this.baseApiUrl}/education/get-educations`);
  }
  getExperienceList() {
    return this.http.get<any>(`${this.baseApiUrl}/experience/get-experiences`);
  }
  getPublicationList() {
    return this.http.get<any>(
      `${this.baseApiUrl}/publication/get-publications`
    );
  }
  getProjectList() {
    return this.http.get<any>(`${this.baseApiUrl}/project/get-projects`);
  }
  getInterestList() {
    return this.http.get<any>(`${this.baseApiUrl}/interest/get-interests`);
  }
  getAdditionalSkillList() {
    return this.http.get<any>(
      `${this.baseApiUrl}/additionalSkill/get-additional-skill`
    );
  }
}
