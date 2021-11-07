import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/services/auth.service';
import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogService } from "../catalog.service";
import { Movie } from "../catalog/model/movie.model";
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-my-list',
    templateUrl: './my-list.component.html',
    styleUrls: ['./my-list.component.scss'],
    providers: [CatalogService]
  })
  export class MyListComponent {
    constructor(
        public catalogService: CatalogService, 
        private auth:AuthService, 
        private http: HttpClient){ };
    
    $favMovies = new BehaviorSubject<Movie[] | null>(null);
    favMovies$ = this.$favMovies.asObservable();
    image = environment.image;

    ngOnInit() {
        this.fetchMovies()
    }

    fetchMovies(){
        this.auth.user$
        .pipe(
          switchMap(user => {return this.http.get(`https://fakeflix-d41a6-default-rtdb.firebaseio.com/favouriteMovs/${user?.id}.json?auth=${user?.token}`)
          }),
          map((movies: any): Movie[] => {
            delete movies.init;
            const moviesArr: Movie[] = [];
            const ids = Object.keys(movies);
            for(let id of ids) {
              moviesArr.push((movies[id] as unknown as Movie));
            }
    
            return moviesArr;
          }),
          tap(e => e.length ? this.$favMovies.next(e): '')
          )
        .subscribe()
      }

      deleteMovie(movie: Movie){
          console.log(movie);
      }

  }