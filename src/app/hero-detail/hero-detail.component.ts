import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroServiceService } from '../hero-service.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroServiceService
  ) { }

  hero: Hero;
  dummyHero: Hero;
  ngOnInit() {
    this.getHero();
  }
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(
      val => {this.hero = val;
        this.dummyHero = {...val}},
      err => console.log(err),
      () => console.log('compl')
    );
  }

  saveHero(hero: Hero) {
    this.heroService.updateHero(hero).subscribe(()=>console.log( `updated successfull`),err => console.log(err),
    () => console.log('compl'));
  }

}
