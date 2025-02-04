import { Routes } from '@angular/router';
import { ɵ$localize } from '@angular/localize'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`
    }
  }
];

