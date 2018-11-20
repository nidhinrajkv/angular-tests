import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroServiceService } from './hero-service.service';
import { HttpClient } from '@angular/common/http';
import { heroes } from './mock-data';
import { of } from 'rxjs';
import { Hero } from './hero';


fdescribe('HeroServiceService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HeroServiceService

  beforeEach(() => TestBed.configureTestingModule({
    providers: [HeroServiceService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroServiceService);

  });

  afterEach(function() {
    httpTestingController.verify();    
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes', () => {
    service.getHeroes().subscribe((data)=>{
      expect(data).toEqual(heroes);
    });
    const req = httpTestingController.expectOne(service.heroesUrl);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(heroes);
  });
  
  it('getHero', () => {
    const hero:Hero = {name:'name',id:1};
    service.getHero(1).subscribe(
      data=> expect(data.id).toEqual(hero.id)
    )
    const req = httpTestingController.expectOne(`${service.heroesUrl}/1`);
    expect(req.cancelled).toBeFalsy();
    req.flush(hero);
  });

  it('updateHero', () => {
    const hero:Hero = {name:'name',id:1};
    service.updateHero(hero).subscribe();
    const req = httpTestingController.
      expectOne(service.heroesUrl);
  });
  
  
});
