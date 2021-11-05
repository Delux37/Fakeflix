import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../catalog/model/movie.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams
    .pipe(
      debounceTime(500),
      switchMap(e => this.fetch('search/multi', `&language=en-US&query=${e.searchTerm}`)
      )
    )
    .subscribe(films => console.log(films))
  }
  fetch(type: string, filter?: string): Observable<Movie[]> {
    return this.http
      .get(
        environment.api +
          `${type}?api_key=${environment['api-key']}${filter ? filter : ''}`
      )
      .pipe(map((res: any) => res.results));
  }
}
