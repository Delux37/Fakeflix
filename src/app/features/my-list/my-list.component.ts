import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/services/auth.service';
import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
    private favMovies!: Movie[];

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
              const movie = {
                firebaseId: id,
                ...movies[id]
              }
              moviesArr.push((movie as unknown as Movie));
            }
    
            return moviesArr;
          }),
          tap(e => {
            if(e.length){
              this.$favMovies.next(e);
              this.favMovies = e;
            }
          })
          )
        .subscribe()
      }

    deleteMovie(movie: Movie, index: number){
      
      this.auth.user$
      .pipe(
        switchMap(user => this.http.delete(`https://fakeflix-d41a6-default-rtdb.firebaseio.com/favouriteMovs/${user?.id}/${movie.firebaseId}.json?auth=${user?.token}`))
      )
      .subscribe(_ => {
        this.favMovies.splice(index,1);
        this.$favMovies.next(this.favMovies);
      })
      
    }

  }