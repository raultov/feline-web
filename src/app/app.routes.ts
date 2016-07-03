import { provideRouter, RouterConfig } from '@angular/router';

import {HomeRoutes} from './home/home.routes';
import {TodolistRoutes} from './todolist/todolist.routes';
import {SimplebindRoutes} from './simplebind/simplebind.routes';

const routes: RouterConfig = [
  ...SimplebindRoutes,
  ...HomeRoutes,
  ...TodolistRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
