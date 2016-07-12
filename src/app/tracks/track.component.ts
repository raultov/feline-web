import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../services/tracks.services';
import { LoginService } from '../login/login.service';

@Component({
    templateUrl: 'app/tracks/track.html',
    styleUrls: [
        'app/tracks/track.css'
    ]
})

export class TrackComponent implements OnInit, OnDestroy {

    idTrack: string;
    points: JSON;

    constructor(private trackService: TrackService,
                private loginService: LoginService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.idTrack = this.route.snapshot.params['id'];

        this.trackService.getListOfPoints(this.idTrack).subscribe(
            (result => {
                  this.points = result;
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

        console.log('Init: ' + this.idTrack);
    }

    ngOnDestroy() {
        console.log('Destroy');
    }
}
