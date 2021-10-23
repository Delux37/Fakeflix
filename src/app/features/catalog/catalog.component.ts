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
  // movies$ = this.catalogService.fetch();
  banner$ = this.catalogService.fetch('discover/tv', '&with_networks=213&sort_by=popularity.desc&language=en-US')
  .pipe(map(res => res[0]));

  topRated$ = this.catalogService.fetch('movie/top_rated');
  trendingNow$ = this.catalogService.fetch('trending/movies/week');
  fakeflixOriginal$ = this.catalogService.fetch('discover/tv');
  action$ = this.catalogService.fetch('discover/movie');
  adventure$ = this.catalogService.fetch('discover/movie');
  upComing$ = this.catalogService.fetch('movie/upcoming');
  ngOnInit(): void {
  }
  
  right() {
  }
}
