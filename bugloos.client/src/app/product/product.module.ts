import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CourseComponent } from './course.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductItemComponent, ProductDetailComponent, CourseComponent],
  imports: [CommonModule, ProductRoutingModule,SharedModule],
  exports: [CourseComponent],
})
export class ProductModule {}
