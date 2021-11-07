import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CatalogService } from "../catalog.service";
import { Movie } from "../catalog/model/movie.model";

@Component({
    selector: 'app-my-list',
    templateUrl: './my-list.component.html',
    styleUrls: ['./my-list.component.scss'],
    providers: [CatalogService]
  })
  export class MyListComponent {
    constructor(public catalogService: CatalogService){ };

    favMovies$ = new BehaviorSubject<Movie[] | null>(null);
    image = environment.image;


  }