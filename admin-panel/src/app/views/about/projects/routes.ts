import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./projects.component').then(
            (m) => m.ProjectsComponent
          ),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-project/add-project.component').then(
            (m) => m.AddProjectComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
