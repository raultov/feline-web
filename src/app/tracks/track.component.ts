import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GOOGLE_MAPS_DIRECTIVES, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { TrackService } from '../services/tracks.services';
import { LoginService } from '../login/login.service';

@Component({
    templateUrl: 'app/tracks/track.html',
    styleUrls: [
        'app/tracks/track.css'
    ],
    directives: [GOOGLE_MAPS_DIRECTIVES],
    providers: [GoogleMapsAPIWrapper]
})

export class TrackComponent implements OnInit, OnDestroy {

    idTrack: string;
    points: JSON;

    lat: number = 51.678418;
    lng: number = 7.809007;

    private listenParameters: any;
    private subscribeGetPoints: any;

    constructor(private trackService: TrackService,
                private loginService: LoginService,
                private route: ActivatedRoute,
                private mapsWrapper: GoogleMapsAPIWrapper) {}

    ngOnInit() {
        this.listenParameters = this.route.params.subscribe(params => {
            this.idTrack = params['id'];

            this.subscribeGetPoints = this.trackService.getListOfPoints(this.idTrack).subscribe(
                (result => {
                    this.points = result;

                    this.mapsWrapper.getNativeMap().then((map) => {
                        console.log(map);
                    });

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
        this.subscribeGetPoints.unsubscribe();
    }
}
