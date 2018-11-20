import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroServiceService } from '../hero-service.service';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.css']
})
export class SearchHeroComponent implements OnInit {

  constructor(private heroService:HeroServiceService) { }

  heroes$ :Observable<Hero[]>;
  searchTerm = new Subject();
  ngOnInit() {

    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.heroService.findHero(term))
    )
  }

  onSearch(name:string):void{
    this.searchTerm.next(name);
  }
}
