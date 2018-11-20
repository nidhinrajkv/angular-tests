import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { heroes } from '../mock-data';
import { HeroServiceService } from '../hero-service.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  constructor(private heroService:HeroServiceService) { }
  heroes: Hero[];

  ngOnInit() {
    this.heroService.getHeroes().subscribe((value)=>this.heroes=value);
  }

  addHero(name:string):void{
    console.log(name);
  }

  deleteHero(hero:Hero):void{
    this.heroService.deleteHero(hero.id).subscribe(
      ()=>this.heroes.splice(this.heroes.indexOf(hero),1)
    );
  }
}
