import { CatalogComponent } from './catalog.component';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogService } from '../catalog.service';



@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CatalogComponent },
    ])
  ],
  providers: [CatalogService]
})
export class CatalogModule { }
