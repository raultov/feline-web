import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Configuration, CONFIG_TOKEN } from '../config/configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

  // Observable navItem source
  _navItemSource = new BehaviorSubject<number>(3);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  // service command
  changeNav(number) {
    this._navItemSource.next(number);
  }

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) private config: Configuration) {
  }

  auth(username: string, password: string): Observable<string> {
    let creds = 'username=' + username + '&password=' + password + '&grant_type=password&scope=general';
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic Y2xpZW50LXdpdGgtcmVmcmVzaC10b2tlbjpjbGllbnQtd2l0aC1yZWZyZXNoLXRva2VuLXNlY3JldA==');
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
    headers.append('Authorization', 'Basic Y2xpZW50LXdpdGgtcmVmcmVzaC10b2tlbjpjbGllbnQtd2l0aC1yZWZyZXNoLXRva2VuLXNlY3JldA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let opts: RequestOptionsArgs = {
      headers: headers
    };

    return this.http.post(this.config.api + '/oauth/token', creds, opts)
    .map(response => response.json().access_token);
  }
}
