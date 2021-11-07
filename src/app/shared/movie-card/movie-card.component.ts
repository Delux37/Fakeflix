import { environment } from 'src/environments/environment';
import { CatalogService } from './../../features/catalog.service';
import { Movie } from 'src/app/features/catalog/model/movie.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() inList = false;
  @Input() movie!: Movie
  @Output() toggle = new EventEmitter<Movie>();
  image = environment.image;

  onToggle(){
    this.toggle.emit(this.movie);
  }

  onPlay() {
    //...
  }

  showDetail() {
    //..
  }
  constructor(public catalogService: CatalogService) { }

  ngOnInit(): void {
  }

}
