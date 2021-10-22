import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CatalogService {

  constructor(private http: HttpClient) {  }

  fetch(): Observable<any> {
    return this.http.get(environment.api + `movie/top_rated?api_key=${environment['api-key']}`, {
      })
      .pipe(
        map((res: any) => res.results),
        tap(res => console.log(res))
      )
  }
}
