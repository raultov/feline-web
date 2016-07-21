import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AppComponent} from './app.component';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { CONFIG_TOKEN, config } from './config/configuration';
import { TrackService } from './services/tracks.services';
import { LoginService } from './login/login.service';

declare var ENV: string;

if (ENV === 'production') {
    enableProdMode();
}

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    LoginService,
    TrackService,
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(CONFIG_TOKEN, {useValue: config}),
    provide(LocationStrategy, {useClass: PathLocationStrategy})
]);
