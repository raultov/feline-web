import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../services/tracks.services';
import { LoginService } from '../login/login.service';
import { configGoogleMapsApiKey } from '../config/configuration';
import { Subject } from 'rxjs/Subject';

declare var google: any;

@Component({
    templateUrl: 'app/tracks/track.html',
    styleUrls: [
        'app/tracks/track.css'
    ]
})

export class TrackComponent implements OnInit, OnDestroy, AfterViewInit {

    idTrack: string;
    points: JSON;
    map: any;
    latCenter: number = 0.0;
    lngCenter: number = 0.0;

    private listenParameters: any;
    private subscribeGetPoints: any;
    private subscribeTrackCenter: any;

    private mapLoadedSubject;

    constructor(private trackService: TrackService,
                private loginService: LoginService,
                private route: ActivatedRoute,
                private elementRef: ElementRef) {
                }

    ngOnInit() {
        this.mapLoadedSubject = new Subject();
        window['initMap'] = (ev) => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: this.latCenter, lng: this.lngCenter},
                            zoom: 8
            });

            this.mapLoadedSubject.next(this.map);
        };

        this.listenParameters = this.route.params.subscribe(params => {
            this.idTrack = params['id'];

            this.subscribeTrackCenter = this.trackService.getTrackCenter(this.idTrack).subscribe(
                (result => {
                    this.latCenter = (<any>result).latitude;
                    this.lngCenter = (<any>result).longitude;

                    if (this.map === null) {
                        this.mapLoadedSubject.subscribe(value => {
                             this.map.setCenter({lat: this.latCenter, lng: this.lngCenter});
                        });
                    } else {
                            this.map.setCenter({lat: this.latCenter, lng: this.lngCenter});
                    }
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

    ngAfterViewInit() {
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://maps.googleapis.com/maps/api/js?key=' + configGoogleMapsApiKey + '&callback=initMap';
        this.elementRef.nativeElement.appendChild(s);
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
