
import { NgModule } from '@angular/core';
import { HomeComponent } from './index';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { TrackModule } from '../tracks/track.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        PipesModule,
        TrackModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
