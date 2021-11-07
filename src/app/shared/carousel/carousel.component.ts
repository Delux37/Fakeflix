import { HttpClient } from '@angular/common/http';
import { tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from './../../auth/services/auth.service';
import { DialogService } from './../dialog/service/dialog.service';
import { CatalogService } from './../../features/catalog.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
  Swiper
} from 'swiper';
import { Movie } from 'src/app/features/catalog/model/movie.model';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
])

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() movies!: any[];
  @Input() title!: string;
  image = environment.image;
  constructor(
    public catalogService: CatalogService, 
    private dialogService: DialogService, 
    private auth:AuthService,
    private http: HttpClient
    ) { }
  showDetailModal(movie: Movie) {
    this.dialogService.updateDialog(movie);
  }
  ngOnInit(): void {
    let carousel = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 4,
      spaceBetween: 20,
      loopFillGroupWithBlank: true,
      slidesPerGroup: 4,
      loop: true,
      pagination: {
        el: '.swiper-pagination-unique',
        type: 'bullets',
        clickable: true
      },
      // pagination: { clickable: true },
      scrollbar: { draggable: true },
    });
  }

  addMovieToFavourite(movie: Movie){
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
