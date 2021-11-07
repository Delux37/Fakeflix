import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../auth/services/auth.service';
import { Movie } from 'src/app/features/catalog/model/movie.model';
import { Injectable } from "@angular/core";
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MyListService{
    constructor(private auth: AuthService, private http: HttpClient){ }
    addToFavourite(movie: Movie){
        this.auth.user$
        .pipe(
          switchMap(user => {
              return this.http
              .post(`https://fakeflix-d41a6-default-rtdb.firebaseio.com/favouriteMovs/${user?.id}.json?auth=${user?.token}`, {
                ...movie
              })
          }))
        .subscribe()
    }
}