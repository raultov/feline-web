import { Component, OnInit, OnDestroy, AfterViewChecked, Inject } from '@angular/core';
import { TrackService } from '../services/tracks.services';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';
declare var jQuery;

import { LoginService } from '../login/login.service';

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ]
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
  }

  ngOnDestroy() {
    this.tracksSubscription.unsubscribe();
  }
}
