import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CONFIG_TOKEN, Configuration } from '../config/configuration';

@Injectable()
export class TrackService {

  constructor(private http: Http,
              @Inject(CONFIG_TOKEN) private config: Configuration) {

  }

  getListOfTracks(startDateFrom: string,
                  startDateTo: string,
                  page: string): Observable<JSON> {

    let headers: Headers = new Headers();
    let token: string = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
    let params: URLSearchParams = new URLSearchParams();
    params.set('startDateFrom', startDateFrom);
    params.set('startDateTo', startDateTo);
    params.set('orderAscDesc', 'DESC');
    params.set('page', page);
    params.set('numRegistersPerPage', '10');

    let opts: RequestOptionsArgs = {
      headers: headers,
      search: params
    };

    let ret = this.http.get(this.config.api + '/v1/tracks', opts)
    .map(response => response.json());

    return ret;
  }
/*
  getListTypesEvent(): Observable<JSON> {
    let headers: Headers = new Headers();
    let token: string = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);

    let opts: RequestOptionsArgs = {
      headers: headers
    };

    let ret = this.http.get(this.config.api + '/v1/admin/events-mgm/types', opts)
    .map(response => response.json());

    return ret;
  }

  getListAreas(): Observable<JSON> {
    let headers: Headers = new Headers();
    let token: string = localStorage.getItem('tokenCliente');
    headers.append('Authorization', 'Bearer ' + token);

    let opts: RequestOptionsArgs = {
      headers: headers
    };

    let ret = this.http.get(this.config.api + '/v1/generics/areas', opts)
    .map(response => response.json());

    return ret;
  }

  getListEvents(idTipoEvento: string, idArea: string, year: string): Observable<JSON> {
    let headers: Headers = new Headers();
    let token: string = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
    let params: URLSearchParams = new URLSearchParams();
    params.set('idTipoEvento', idTipoEvento);
    params.set('idArea', idArea);
    params.set('year', year);

    let opts: RequestOptionsArgs = {
      headers: headers,
      search: params
    };

    let ret = this.http.get(this.config.api + '/v1/admin/events-mgm', opts)
    .map(response => response.json());

    return ret;
  }
*/
}
