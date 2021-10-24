import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from './catalog/model/movie.model';
import { Genre } from './catalog/model/genre.model';

@Injectable({providedIn: 'root'})
export class CatalogService {
  private _genres = new Map();

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
