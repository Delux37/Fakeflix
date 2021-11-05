import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest, from, Observable } from 'rxjs';
import { Movie } from './catalog/model/movie.model';
import { Genre } from './catalog/model/genre.model';
import { Router } from '@angular/router';

@Injectable()
export class CatalogService {
  private _genres = new Map();
  titles!: string[];
  banner$ = this.fetch(
    'discover/tv',
    '&with_networks=213&sort_by=popularity.desc&language=en-US'
  ).pipe();

  movies$!: Observable<{
    banner: Movie[];
    rest: Movie[][];
  }>;

  constructor(private http: HttpClient, private router: Router) {
    this.http
      .get<{ genres: Genre[] }>(
        environment.api + `genre/movie/list?api_key=${environment['api-key']}`
      )
      .pipe(
        map((genres) => {
          genres.genres.forEach((genre) => {
            this._genres.set(genre.id, genre.name);
          });
        })
      )
      .subscribe();

    const url = this.router.url.substr(1);
    const urls = {
      'home': {
        urls: [
          ['movie/top_rated', '&sort_by=popularity.desc&region=US'],
          ['trending/movies/week', '&sort_by=popularity.desc&language=en-US'],
          [
            'discover/tv',
            '&with_networks=213&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/movie',
            '&with_genres=28&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/movie',
            '&with_genres=12&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/movie',
            '&with_genres=16&sort_by=popularity.desc&language=en-US',
          ],
          ['movie/upcoming', '&language=en-US'],
        ],
        titles: [
          'Top Rated on Fakeflix',
          'Trending now',
          'Fakeflix Originals',
          'Action',
          'Adventure',
          'Animation',
          'Upcoming',
        ],
      },
      'tv-series': {
        urls: [
          ['trending/tv/week', '&sort_by=popularity.desc&region=US'],
          [
            'discover/tv',
            '&with_networks=213&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/tv',
            '&with_genres=10759&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/tv',
            '&with_genres=16&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/tv',
            '&with_genres=35&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/tv',
            '&with_genres=99&sort_by=popularity.desc&language=en-US',
          ],
          [
            'discover/tv',
            '&with_genres=10762&sort_by=popularity.desc&language=en-US',
          ],
        ],
        titles: [
          'Trending now',
          'Fakeflix original',
          'Action & Adventures',
          'Animation',
          'Comedy',
          'Documentary',
          'Kids',
        ],
      },
      'movies': {
        urls: [],
        titles: [],
      },
      'new-popular': {
        urls: [],
        titles: [],
      },
    };
    let activeMovies = { ...urls.home };
    switch (url) {
      case 'home':
        activeMovies = { ...urls['home'] };
        this.titles = urls.home.titles;
        break;
      case 'tv-series':
        activeMovies = { ...urls['tv-series'] };
        this.titles = urls['tv-series'].titles;
        break;
      case 'movies':
        activeMovies = { ...urls['movies'] };
        break;
      case 'new-popular':
        activeMovies = { ...urls['new-popular'] };
        break;
    }   
    const restArr = activeMovies.urls.map((movie) => {
      return this.fetch(movie[0], movie[1]);
    });

    this.movies$ = combineLatest([
      this.banner$,
      ...restArr,
    ]).pipe(
      map(([banner, ...rest]) => {
        return {
          banner,
          rest: [...rest],
        };
      })
    );
  }

  fetch(type: string, filter?: string): Observable<Movie[]> {
    return this.http
      .get(
        environment.api +
          `${type}?api_key=${environment['api-key']}${filter ? filter : ''}`
      )
      .pipe(map((res: any) => res.results));
  }
  getGenreName(id: number): string {
    return this._genres.get(id);
  }
}
