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
          import('./add-edit-publication/add-edit-publication.component').then(
            (m) => m.AddEditPublicationComponent
          ),
        data: {
          title: 'Add'
        }
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./add-edit-publication/add-edit-publication.component').then(
            (m) => m.AddEditPublicationComponent
          ),
        data: {
          title: 'Edit'
        }
      }
    ],
  },
];
