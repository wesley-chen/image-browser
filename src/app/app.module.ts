import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdIconRegistry } from '@angular/material';

import { AppComponent } from './app.component';

import { ImageBrowserComponent } from './image-browser';
import { ImageGridComponent } from './image-grid';
import { ImageContainerComponent } from './image-container';

@NgModule({
  imports: [
    BrowserModule, FlexLayoutModule.forRoot(), MaterialModule.forRoot()
  ],
  declarations: [AppComponent, ImageBrowserComponent, ImageGridComponent, ImageContainerComponent],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
