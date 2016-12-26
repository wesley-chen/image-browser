import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutComponent } from './about.component';
import { BannerComponent } from './banner.component';
import {
  HeroService,
  UserService
} from './model';
import { TwainService } from './shared/twain.service';
import { WelcomeComponent } from './welcome.component';


import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { ImageBrowserComponent } from './image-browser';
import { ImageGridComponent } from './image-grid';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, HeroService, TwainService, UserService],
  declarations: [AppComponent, AboutComponent, BannerComponent, WelcomeComponent, ImageBrowserComponent, ImageGridComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
