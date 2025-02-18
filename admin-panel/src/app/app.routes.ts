import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from '../app/guards/auth.guard';
import { authRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'post',
        loadChildren: () => import('./views/post/routes').then((m) => m.routes),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./views/about/projects/routes').then((m) => m.routes),
      },
      {
        path: 'education',
        loadChildren: () =>
          import('./views/about/educations/routes').then((m) => m.routes),
      },
      {
        path: 'experience',
        loadChildren: () =>
          import('./views/about/experiences/routes').then((m) => m.routes),
      },
      {
        path: 'hobby',
        loadChildren: () =>
          import('./views/about/hobbies/routes').then((m) => m.routes),
      },
      {
        path: 'publication',
        loadChildren: () =>
          import('./views/about/publications/routes').then((m) => m.routes),
      },
      {
        path: 'interest',
        loadChildren: () =>
          import('./views/about/interests/routes').then((m) => m.routes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then((m) => m.routes),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
    canActivate: [authRedirectGuard],
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
    canActivate: [authRedirectGuard],
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: 'login' },
];
