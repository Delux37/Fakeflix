import { CatalogService } from './../catalog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent{
  constructor(private catalogService: CatalogService) { }
  movies$ = this.catalogService.movies$;
  titles = this.catalogService.titles;
}
