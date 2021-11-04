import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Movie } from './catalog/model/movie.model';
import { Genre } from './catalog/model/genre.model';

@Injectable({providedIn: 'root'})
export class CatalogService {
  private _genres = new Map();

  banner$ = this.fetch('discover/tv', '&with_networks=213&sort_by=popularity.desc&language=en-US')
  .pipe();

  topRated$ = this.fetch('movie/top_rated');
  trendingNow$ = this.fetch('trending/movies/week');
  fakeflixOriginal$ = this.fetch('discover/tv');
  action$ = this.fetch('discover/movie');
  adventure$ = this.fetch('discover/movie');
  upComing$ = this.fetch('movie/upcoming');

  movies$ = combineLatest([
    this.banner$,
    this.topRated$,
    this.trendingNow$,
    this.fakeflixOriginal$,
    this.action$,
    this.adventure$,
    this.upComing$
  ]).pipe(
    map(( [banner, topRated, trendingNow, fakeFlixOriginal, action, adventure, upComing] ) => {
      return { 
        banner, 
        rest: [
          topRated, trendingNow, fakeFlixOriginal, action, adventure, upComing
        ],
      }
    })
  )

  constructor(private http: HttpClient) { 
    this.http.get<{ genres: Genre[] }>(environment.api + `genre/movie/list?api_key=${environment['api-key']}`)
    .pipe(map(genres => {
      genres.genres.forEach(
        genre => {
          this._genres.set(genre.id, genre.name);
        }
      )
    }))
    .subscribe()
  }
  
  fetch(type: string, filter?: string): Observable<Movie[]> {
    return this.http.get(environment.api + `${type}?api_key=${environment['api-key']}&${filter ? filter : ''}`, {
      })
      .pipe(
        map((res: any) => res.results)
      )
  }
  getGenreName(id: number): string {
    return this._genres.get(id);
  }
}
