import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TextInputComponent } from './components/text-input/text-input.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListboxButtonsComponent } from './listbox-buttons/listbox-buttons.component';
import { PagerComponent } from './components/pager/pager.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TextInputComponent,
    PagingHeaderComponent,
    ListboxButtonsComponent,
    PagerComponent,
    BasketSummaryComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    PaginationModule,
    FormsModule,
    TextInputComponent,
    PagingHeaderComponent,
    ListboxButtonsComponent,
    PagerComponent,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
