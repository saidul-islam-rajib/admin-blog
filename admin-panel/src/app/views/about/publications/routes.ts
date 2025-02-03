import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Publication',
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
          import('./publications.component').then(
            (m) => m.PublicationsComponent
          ),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-publication/add-publication.component').then(
            (m) => m.AddPublicationComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
