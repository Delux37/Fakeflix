import { Movie } from 'src/app/features/catalog/model/movie.model';
import { MyListService } from './../../features/my-list/service/my-list.service';
import { CatalogService } from './../../features/catalog.service';
import { DialogService } from './service/dialog.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
     public catalogService :CatalogService, 
     private listService: MyListService) { }

  movie$ = this.dialogService.dialog$;
  @Input() disableAdd  = false;
  
  ngOnInit(): void {
    
  }
  closeModal() {
    this.dialogService.closeModal();
  }

  addMovie(movie: Movie) {
    this.listService.addToFavourite(movie);
  }
}
