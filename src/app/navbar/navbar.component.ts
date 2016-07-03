import {Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { FormBuilder, ControlGroup, Control, AbstractControl, FORM_DIRECTIVES, Validators } from '@angular/common';

import { LoginService, UserLogged } from '../login/login.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'as-navbar',
    // providers: [ LoginService ],
    templateUrl: 'app/navbar/navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class NavbarComponent implements OnInit, OnDestroy {
    @Input() brand: string;
    form: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;

    subscription: Subscription;
    userLogged: UserLogged;

    constructor(private loginService: LoginService,
                private formBuilder: FormBuilder,
                private cd: ChangeDetectorRef) {
      this.loginService = loginService;
    }

    ngOnInit() {
      this.subscription = this.loginService.navItem$.subscribe(
        item =>  {
            this.userLogged = item;
            this.cd.markForCheck(); // marks path
            console.log(this.userLogged.email);
        }
      );

      this.form = new ControlGroup({
        username: new Control('', Validators.required),
        password: new Control('', Validators.required)
      });

      this.username = this.form.controls['username'];
      this.password = this.form.controls['password'];

      this.loginService.authClient().subscribe(
        data => {
          localStorage.setItem('tokenCliente', data);
          console.log('Token Cliente: ' + data);
        },
        err => {
          console.log('Credenciales inválidas');
        }
      );
    }

    ngOnDestroy() {
      // prevent memory leak when component is destroyed
      this.subscription.unsubscribe();
    }

    auth() {
      this.loginService.auth(this.username.value, this.password.value).subscribe(
        data => {
          localStorage.setItem('token', data);
          this.userLogged.loggedIn = true;
          this.userLogged.name = 'My Name';
          this.userLogged.email = 'my.email@example.com';
          this.cd.markForCheck(); // marks path
          console.log('Token: ' + data);
        },
        err => {
          this.userLogged.loggedIn = false;
          this.cd.markForCheck(); // marks path
          console.log('Credenciales inválidas');
        }
      );
    }
}
