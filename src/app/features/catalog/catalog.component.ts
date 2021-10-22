import { CatalogService } from './../catalog.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  constructor(private catalogService: CatalogService) { }
  // movies$ = this.catalogService.fetch();
  data$ = this.catalogService.fetch()
  ngOnInit(): void {
  }
  
  right() {
  }
}
