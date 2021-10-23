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
  constructor(public catalogService: CatalogService) { }
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
  

}
