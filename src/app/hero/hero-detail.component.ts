/* tslint:disable:member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Hero } from '../model';
import { HeroDetailService } from './hero-detail.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  providers: [HeroDetailService]
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroDetailService: HeroDetailService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  @Input() hero: Hero;

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroDetailService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);

  }

  private getHero(id: string): void {
    this.heroDetailService.getHero(id).then(hero => {
      if (hero) {
        this.hero = hero;
      } else {
        this.gotoList(); // id not found; navigate to list
      }
    });
  }

  save(): void {
    this.heroDetailService.saveHero(this.hero).then(() => this.gotoList());
  }

  cancel() { this.gotoList(); }

  gotoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
