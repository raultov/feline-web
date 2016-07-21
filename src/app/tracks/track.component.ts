import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { TrackService } from '../services/tracks.services';
import { LoginService } from '../login/login.service';

@Component({
    templateUrl: 'app/tracks/track.html',
    styleUrls: [
        'app/tracks/track.css'
    ],
    directives: [GOOGLE_MAPS_DIRECTIVES]
})

export class TrackComponent implements OnInit, OnDestroy {

    idTrack: string;
    points: JSON;

    latCenter: number = 51.678418;
    lngCenter: number = 7.809007;

    private listenParameters: any;
    private subscribeGetPoints: any;
    private subscribeTrackCenter: any;

    constructor(private trackService: TrackService,
                private loginService: LoginService,
                private route: ActivatedRoute) {
                }

    ngOnInit() {
        this.listenParameters = this.route.params.subscribe(params => {
            this.idTrack = params['id'];

            this.subscribeTrackCenter = this.trackService.getTrackCenter(this.idTrack).subscribe(
                (result => {
                    this.latCenter = (<any>result).latitude;
                    this.lngCenter = (<any>result).longitude;
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

            this.subscribeGetPoints = this.trackService.getListOfPoints(this.idTrack).subscribe(
                (result => {
                    this.points = result;

                    // console.log(native);
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
        });
    }

    ngOnDestroy() {
        this.listenParameters.unsubscribe();

        if (!!this.subscribeGetPoints) {
            this.subscribeGetPoints.unsubscribe();
        }

        if (!!this.subscribeTrackCenter) {
            this.subscribeTrackCenter.unsubscribe();
        }
    }
}
