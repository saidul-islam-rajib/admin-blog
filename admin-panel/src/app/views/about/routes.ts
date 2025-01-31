import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Education',
    },
    children: [
      {
        path: '',
        redirectTo: 'education',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./educations/educations.component').then(m => m.EducationsComponent),
        data: {
          title: 'List'
        }
      }
    ]
  },
];
