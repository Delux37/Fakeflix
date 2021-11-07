import { CatalogService } from './../catalog.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../catalog/model/movie.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [CatalogService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  image = environment.image;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, public catalogService: CatalogService) { }
  searchKeyword$ = new BehaviorSubject<string>('');
  searchMovies$ = new BehaviorSubject<Movie[] | null>(null);

  ngOnInit(): void {
  this.route.queryParams
    .pipe(
      debounceTime(500),
      tap(keyword => this.searchKeyword$.next(keyword.searchTerm)),
      switchMap(e => this.fetch('search/multi', `&language=en-US&query=${e.searchTerm}`)), 
      tap(movies => {
        this.searchMovies$.next(movies);
      })
    ).subscribe(e => console.log(e));
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
