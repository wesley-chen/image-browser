import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PopoverModule } from "ng2-popover";

import { AppComponent } from './app.component';

import { ImageBrowserComponent } from './image-browser';
import { ImageGridComponent } from './image-grid';
import { ImageContainerComponent } from './image-container';

@NgModule({
  imports: [
    BrowserModule, PopoverModule
  ],
  declarations: [AppComponent, ImageBrowserComponent, ImageGridComponent, ImageContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
