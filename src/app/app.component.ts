import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import '../assets/css/styles.m.css';


@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    // var img = require('../assets/images/ic_close_48px.svg');
    // iconRegistry.addSvgIcon(
    //   'close', img);
  }
}
