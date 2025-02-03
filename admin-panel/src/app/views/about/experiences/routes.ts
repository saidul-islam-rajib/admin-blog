import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Experience',
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
          import('./experiences.component').then(
            (m) => m.ExperiencesComponent
          ),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-experience/add-experience.component').then(
            (m) => m.AddExperienceComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
