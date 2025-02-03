import { Component } from '@angular/core';
import { AboutApiService } from '../../../core/services/about-api.service';
import { Project, ProjectSection } from '../../../core/interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
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
        console.log("list of project ", this.projectList)
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
    return section.map((s: any, index: number) => `${index + 1}. ${s.topicName}`).join('<br/><br/>')
  }
}
