import { NgModule } from '@angular/core';
import { TrackComponent } from './index';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        TrackComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
    ],
    exports: [
        TrackComponent
    ]
})
export class TrackModule {
}
