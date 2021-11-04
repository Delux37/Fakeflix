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

  topRated$ = this.fetch('movie/top_rated', '&sort_by=popularity.desc&region=US');
  trendingNow$ = this.fetch('trending/movies/week', '&sort_by=popularity.desc&language=en-US');
  fakeflixOriginal$ = this.fetch('discover/tv', '&with_networks=213&sort_by=popularity.desc&language=en-US');
  action$ = this.fetch('discover/movie', '&with_genres=28&sort_by=popularity.desc&language=en-US');
  adventure$ = this.fetch('discover/movie', '&with_genres=12&sort_by=popularity.desc&language=en-US');
  animation$ = this.fetch('discover/movie', '&with_genres=16&sort_by=popularity.desc&language=en-US');
  upComing$ = this.fetch('movie/upcoming', '&language=en-US');

  movies$ = combineLatest([
    this.banner$,
    this.topRated$,
    this.trendingNow$,
    this.fakeflixOriginal$,
    this.action$,
    this.adventure$,
    this.animation$,
    this.upComing$
  ]).pipe(
    map(( [banner, topRated, trendingNow, fakeFlixOriginal, action, adventure,animation, upComing] ) => {
      return { 
        banner, 
        rest: [
          topRated, trendingNow, fakeFlixOriginal, action, adventure, animation, upComing
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
