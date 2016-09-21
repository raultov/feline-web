import { NgModule } from '@angular/core';

import { APP_PROVIDERS } from './app.providers';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { TodolistModule } from './todolist/todolist.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NavbarModule,
        HomeModule,
        TodolistModule,
        routing,
        RouterModule,
        HttpModule
    ],
    providers: [ APP_PROVIDERS, appRoutingProviders ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
