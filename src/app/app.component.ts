import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import {CONSTANTS} from './shared';

@Component({
    selector: 'as-main-app',
    templateUrl: 'app/app.html',
    providers: [LoginService],
    directives: [NavbarComponent, HomeComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
    public appBrand: string;

    constructor() {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
    }
}
