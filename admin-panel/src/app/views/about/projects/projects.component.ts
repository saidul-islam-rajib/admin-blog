import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Project, ProjectSection } from '../../../core/interfaces/project';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public projectList: Project[] = [];
  constructor(private about: AboutApiService) {
    this.getProjectList();
  }

  getProjectList() {
    this.about.getProjectList().subscribe({
      next: (response) => {
        this.projectList = response;
      },
      error: (err) => {
        console.log('Error while loading project list', err.error.message);
      },
    });
  }

  getProjectSection(section: any) {
    if (!section || !Array.isArray(section)) {
      return '';
    }
    return section.map((s: any, index: number) => `${index + 1}. ${s.topicName}`)
  }

  getProjectTagSection(tag: any) {
    if (!tag || !Array.isArray(tag)) {
      return '';
    }
    return tag.map((k: any) => `${k.projectTagName}`);
  }
}
