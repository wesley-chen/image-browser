import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';

import { AboutComponent }     from './about.component';
import { HighlightDirective } from './shared/highlight.directive';

let fixture: ComponentFixture<AboutComponent>;

describe('AboutComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AboutComponent, HighlightDirective],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(AboutComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have skyblue <h2>', () => {
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.styles['backgroundColor']).toBe('skyblue');
  });
});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/