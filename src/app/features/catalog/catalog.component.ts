import { CatalogService } from './../catalog.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  constructor(private catalogService: CatalogService) { }
  movies$ = this.catalogService.movies$;
  titles = [
    'Top Rated on Fakeflix',
    'Trending now',
    'Upcoming',
    'Fakeflix Originals',
    'Action',
    'Adventure'
  ]
  ngOnInit(): void {
  }
  
  right() {
  }
}
