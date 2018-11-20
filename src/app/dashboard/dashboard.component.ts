import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { heroes } from '../mock-data';
import { HeroServiceService } from '../hero-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService: HeroServiceService) { }
  heroes: Hero[];
  ngOnInit() {
    this.heroService.getHeroes().subscribe((val) => {
      console.log('fetched', val);
      this.heroes = val.slice(0, 5);
    });
  }

}
