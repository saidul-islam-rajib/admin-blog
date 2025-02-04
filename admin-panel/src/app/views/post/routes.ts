import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Post',
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
          import('./post.component').then(
            (m) => m.PostComponent
          ),
        data: {
          title: 'List',
        },
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-post/add-post.component').then(
            (m) => m.AddPostComponent
          ),
        data: {
          title: 'Add',
        },
      }
    ],
  },
];
