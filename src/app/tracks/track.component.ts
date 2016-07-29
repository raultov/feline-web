import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../services/tracks.services';
import { LoginService } from '../login/login.service';
import { configGoogleMapsApi } from '../config/configuration';
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

    routePlanCoordinates = [];
    routePath: any;
    startingMarker: any;
    endingMarker: any;

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
                            zoom: 10
            });

            this.mapLoadedSubject.next(this.map);
        };

        this.listenParameters = this.route.params.subscribe(params => {
            this.idTrack = params['id'];

            this.subscribeTrackCenter = this.trackService.getTrackCenter(this.idTrack).subscribe(
                (result => {
                    this.latCenter = (<any>result).latitude;
                    this.lngCenter = (<any>result).longitude;

                    if (this.map == null) {
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

                    // Reset data
                    this.routePlanCoordinates = [];

                    if (this.routePath) {
                        this.routePath.setMap(null);
                    }

                    if (this.startingMarker) {
                        this.startingMarker.setMap(null);
                    }

                    if (this.endingMarker) {
                        this.endingMarker.setMap(null);
                    }

                    // Fill route with points
                    for (let i = 0; i < (<any>this.points).length; i++) {
                        let point = this.points[i];
                        this.routePlanCoordinates.push({lat: (<any>point).latitude, lng: (<any>point).longitude});
                    }

                    this.routePath = new google.maps.Polyline({
                        path: this.routePlanCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });

                    this.startingMarker = new google.maps.Marker({
                        position: this.routePlanCoordinates[0],
                        title: 'Start',
                        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    });

                    this.endingMarker = new google.maps.Marker({
                        position: this.routePlanCoordinates[this.routePlanCoordinates.length - 1] ,
                        title: 'End',
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    });

                    if (this.map == null) {
                        this.mapLoadedSubject.subscribe(value => {
                             this.routePath.setMap(this.map);
                             this.startingMarker.setMap(this.map);
                             this.endingMarker.setMap(this.map);
                        });
                    } else {
                            this.routePath.setMap(this.map);
                            this.startingMarker.setMap(this.map);
                            this.endingMarker.setMap(this.map);
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
        });
    }

    ngAfterViewInit() {
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://maps.googleapis.com/maps/api/js?key=' + configGoogleMapsApi.apiKey + '&callback=initMap';
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
