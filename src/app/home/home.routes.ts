import { HomeComponent } from './home.component';
import { TrackComponent } from '../tracks/track.component';

export const HomeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'track/:id',  component: TrackComponent },
      { path: '',  component: null }
    ]
  }
];
