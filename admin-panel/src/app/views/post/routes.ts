import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post.component').then(m => m.PostComponent),
    data: {
      title: $localize`Post`
    }
  }
];

