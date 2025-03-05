import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Experience } from '../interfaces/experience';
import { AdditionalSkill } from '../interfaces/additional-skill';
import { Observable } from 'rxjs';

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
    return this.http.get<Experience[]>(`${this.baseApiUrl}/experience/get-experiences`);
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
    return this.http.get<AdditionalSkill[]>(
      `${this.baseApiUrl}/additionalSkill/get-additional-skill`
    );
  }

  deleteEducation(educationId: any, userId: any): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/education/${educationId}/delete/user/${userId}`);
  }
  deleteExperience(id: any, userId: any): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/experience/delete-experience/${id}/user/${userId}`);
  }
}
