import { LoginService } from './login/login.service';
import { TrackService } from './services/tracks.services';
import { CONFIG_TOKEN, config } from './config/configuration';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export const APP_PROVIDERS = [
    LoginService,
    TrackService,
    { provide: CONFIG_TOKEN, useValue: config },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
];
