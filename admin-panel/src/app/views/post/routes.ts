import { Routes } from '@angular/router';
import { ɵ$localize } from '@angular/localize'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post.component').then(m => m.PostComponent),
    data: {
      title: $localize`Post`
    }
  }
];

