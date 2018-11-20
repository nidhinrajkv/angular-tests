import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { heroes } from './mock-data';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  constructor(private http:HttpClient) { }
  heroesUrl = 'api/heroes';
  
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError('getHeroes',[]))
    );
  }

  getHero(ids:number):Observable<Hero>{

    const url = this.heroesUrl+`/${ids}`;

    return this.http.get<Hero>(url)
    .pipe(
      catchError(this.handleError<Hero>(`getHero+${ids}`,{id:0 ,name:'noName'}))
    );
    /* console.log("ids",ids)
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(val=>console.log(val)),
      map(arr=>arr.filter(hero=>hero.id===ids))
      //filter(hero=>hero.id===11),
      //catchError(this.handleError('getHeroes',[]))
      //catchError(val => of(`I caught: ${val}`))
    ); */
  }

  updateHero(hero:Hero){
    return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
      tap(()=>console.log(hero.name + "upated")),
      catchError(this.handleError(`${hero.name} update failed`))
    )
  }

  deleteHero(heroid:number):Observable<Hero>{
    const url = `${this.heroesUrl}/${heroid}`
    return this.http.delete<Hero>(url,httpOptions).pipe(
      catchError(this.handleError<Hero>(`hero with id ${heroid} removed`,{id:heroid,name:'noName'}))
    )
  }

  findHero(keyword:string):Observable<Hero[]>{
    const url = `${this.heroesUrl}/?name=${keyword}`;
    return this.http.get<Hero[]>(url).pipe(
      catchError(this.handleError('find heroes',[]))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
