import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CarouselComponent } from './carousel/carousel.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [CarouselComponent, DialogComponent],

  imports: [
    CommonModule,
    SwiperModule,
  ],
  exports: [
    CarouselComponent,
    DialogComponent
  ]
})
export class SharedModule { }
