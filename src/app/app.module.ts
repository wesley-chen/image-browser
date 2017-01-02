import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ImageBrowserComponent } from './image-browser';
import { ImageGridComponent } from './image-grid';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [AppComponent, ImageBrowserComponent, ImageGridComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
