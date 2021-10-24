import { CatalogService } from './../../features/catalog.service';
import { DialogService } from './service/dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogService: DialogService, public catalogService :CatalogService) { }

  movie$ = this.dialogService.dialog$;

  ngOnInit(): void {
    
  }
  closeModal() {
    this.dialogService.closeModal();
  }
}
