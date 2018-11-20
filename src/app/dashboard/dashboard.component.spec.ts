import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SearchHeroComponent } from '../search-hero/search-hero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { heroes } from '../mock-data';
import { HeroServiceService } from '../hero-service.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService, heroSpy;
  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('HeroServiceService',['getHeroes']);
    heroSpy = heroService.getHeroes.and.returnValue(of(heroes));
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent,SearchHeroComponent ],
      imports:[RouterTestingModule.withRoutes([])],
      providers:[{provide:HeroServiceService, useValue:heroService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
