import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Configuration, CONFIG_TOKEN } from '../config/configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export interface UserLogged {
  name: string;
  email: string;
  loggedIn: boolean;
}

@Injectable()
export class LoginService {

  userLogged: UserLogged = {
    name: 'name',
    email: 'email@example.com',
    loggedIn: true
  };

  userNotLogged: UserLogged = {
    name: '',
    email: '',
    loggedIn: false
  };
  // Observable navItem source
  _navItemSource = new BehaviorSubject<UserLogged>(this.userNotLogged);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();

  // service command
  logged() {
    // this._navItemSource.next(UserLogged);
    this._navItemSource.next(this.userLogged);
  }

  notLoggedIn() {
    // this._navLoggedSource.next(false);
    let myUserLogged: UserLogged = {
      name: '',
      email: '',
      loggedIn: false
    };
    this._navItemSource.next(myUserLogged);
  }

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) private config: Configuration) {
  }

  auth(username: string, password: string): Observable<string> {
    let creds = 'username=' + username + '&password=' + password + '&grant_type=password&scope=general';
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.config.apiClientAuthorization);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let opts: RequestOptionsArgs = {
      headers: headers
    };

    return this.http.post(this.config.api + '/oauth/token', creds, opts)
    .map(response => response.json().access_token);
  }

  authClient(): Observable<string> {
    let creds = '&grant_type=client_credentials&client_id=client-with-refresh-token';
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.config.apiClientAuthorization);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let opts: RequestOptionsArgs = {
      headers: headers
    };

    return this.http.post(this.config.api + '/oauth/token', creds, opts)
    .map(response => response.json().access_token);
  }

  getUserData(token: string): Observable<JSON> {
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    let opts: RequestOptionsArgs = {
      headers: headers
    };

    let ret = this.http.get(this.config.api + '/v1/users', opts)
    .map(response => response.json());

    return ret;
  }
}
