import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  constructor() { }

  addDots(str: string): string {
    let temp = str;
    if(str.length > 147){
      temp = str.substr(0,165) + '...';
    }
    return temp;
  }
  convertToUrl(str: string) {
    return 'https://image.tmdb.org/t/p/original//' + str;
  }
  ngOnInit(): void {
  }

}
