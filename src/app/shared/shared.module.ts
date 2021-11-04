import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CarouselComponent } from './carousel/carousel.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavbarComponent } from '../features/catalog/navbar/navbar.component';
import { BannerComponent } from '../features/catalog/banner/banner.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CarouselComponent, DialogComponent, NavbarComponent,
    BannerComponent],

  imports: [
    CommonModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    CarouselComponent,
    DialogComponent,
    NavbarComponent,
    BannerComponent
  ]
})
export class SharedModule { }
