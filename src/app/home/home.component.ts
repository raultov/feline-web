import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackService } from '../services/tracks.services';
import { JsonFieldsPipe } from '../pipes/json-iterator.pipe';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';

import { LoginService } from '../login/login.service';

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    pipes: [ JsonFieldsPipe ]
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string;

  tracks: JSON;

  private tracksSubscription: any;

  /*eventos: JSON;
  tiposEventos: JSON;
  areas: JSON;
  years: string[] = [];

  selectedTipoEvento: string;
  selectedArea: string;
  selectedYear: string;
*/
  constructor(private trackService: TrackService,
              private loginService: LoginService) {
  }

  notLogged() {
    this.loginService.notLoggedIn();
  }

/*
  onChangeTipoEvento(newTipoEvento) {
    this.selectedTipoEvento = newTipoEvento;
    this.selectedArea = '';

    this.eventService.getListEvents(this.selectedTipoEvento, '', this.selectedYear).subscribe(
      (res => this.eventos = res),
      (err => console.log(err))
    );
  }

  onChangeArea(newArea) {
    this.selectedArea = newArea;
    this.selectedTipoEvento = '';

    this.eventService.getListEvents('', newArea, this.selectedYear).subscribe(
      (res => this.eventos = res),
      (err => console.log(err))
    );
  }

  onChangeYear(newYear) {
    this.selectedYear = newYear;

    this.eventService.getListEvents(this.selectedTipoEvento, this.selectedArea, this.selectedYear).subscribe(
      (res => this.eventos = res),
      (err => console.log(err))
    );
  }
*/
  ngOnInit() {
    this.title = '¡Welcome to Angular 2 Starter!';

    this.tracksSubscription = this.trackService.getListOfTracks('', '', '0').subscribe(
      (result => {
                  this.tracks = result;
                  // this.selectedTipoEvento = this.tiposEventos[0].idTipoEvento;
                  jQuery('#example').DataTable();
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
