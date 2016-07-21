import { Component, OnInit, OnDestroy, AfterViewChecked, Inject } from '@angular/core';
import { TrackService } from '../services/tracks.services';
import { JsonFieldsPipe } from '../pipes/json-iterator.pipe';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';
declare var jQuery;

import { LoginService } from '../login/login.service';

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    pipes: [ JsonFieldsPipe ],
    directives: [ ROUTER_DIRECTIVES ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  title: string;
  tracks: JSON;
  private tracksSubscription: any;

  constructor(private trackService: TrackService,
              private loginService: LoginService,
              @Inject(Router) private router: Router) {
  }

  notLogged() {
    this.loginService.notLoggedIn();
  }

  ngAfterViewChecked() {
    (<any>jQuery('#trackstable')).DataTable();
  }

  goToTrackPoints(idTrack) {
    this.router.navigate(['/track', idTrack ]);
  }

  ngOnInit() {
    this.title = '¡Welcome to Angular 2 Starter!';

    this.tracksSubscription = this.trackService.getListOfTracks('', '', '0').subscribe(
      (result => {
                  this.tracks = result;
                }),
      (err => {
                  if (err.status === 401) {
                    // Token expired, enable login menu
                    this.loginService.notLoggedIn();
                    // TODO Inform user
                  }

                  console.log(err);
      })
    );

/*
    this.eventService.getListTypesEvent().subscribe(
      (result => {
                  this.tiposEventos = result;
                  this.selectedTipoEvento = this.tiposEventos[0].idTipoEvento;
                  this.eventService.getListEvents(this.selectedTipoEvento, '', '').subscribe(
                    (res => this.eventos = res),
                    (err => console.log(err))
                  );
                }),
      (err => console.log(err))
    );

    this.eventService.getListAreas().subscribe(
      (result => {
                  this.areas = result;
                }),
      (err => console.log(err))
    );

    this.selectedArea = '';

    let year = 2011;
    let currentYear = +(new Date()).getFullYear();
    while (year <= currentYear) {
      this.years.push(String(year));
      year++;
    }

    this.selectedYear = '';
    */
/*
    Observable.forkJoin(
        this.eventService.getListTypesEvent(),
        this.eventService.getListEvents('')
    ).subscribe(
      (result => {
                  this.tiposEventos = result[0];
                  this.eventos = result[1];
      }),
      (err => console.log(err))
    );
*/
  }

  ngOnDestroy() {
    this.tracksSubscription.unsubscribe();
  }
}
