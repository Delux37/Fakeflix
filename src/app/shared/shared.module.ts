import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CarouselComponent } from './carousel/carousel.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavbarComponent } from '../features/catalog/navbar/navbar.component';
import { BannerComponent } from '../features/catalog/banner/banner.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
@NgModule({
  declarations: [CarouselComponent, DialogComponent, NavbarComponent,
    BannerComponent,
    LoadingSpinnerComponent,
    NotificationsComponent,
    LoadingSkeletonComponent,
    MovieCardComponent],

  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CarouselComponent,
    DialogComponent,
    NavbarComponent,
    BannerComponent,
    LoadingSpinnerComponent,
    NotificationsComponent,
    LoadingSkeletonComponent,
    MovieCardComponent
  ]
})
export class SharedModule { }
