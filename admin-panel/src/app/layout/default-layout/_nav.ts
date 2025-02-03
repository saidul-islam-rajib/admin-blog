import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Theme',
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'Education',
    url: '/education',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/education/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Add',
        url: '/education/add',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Edit',
        url: '/education/edit/:id',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Experience',
    url: '/experience',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/experience/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Add',
        url: '/experience/add',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Hobby',
    url: '/hobby',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/hobby/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Add',
        url: '/hobby/add',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Publication',
    url: '/publication',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/publication/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Add',
        url: '/publication/add',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Interest',
    url: '/interest',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/interest/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Add',
        url: '/interest/add',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto',
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' },
  },
];
