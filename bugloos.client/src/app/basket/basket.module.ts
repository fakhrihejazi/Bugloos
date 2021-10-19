import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { CheckoutModule } from '../checkout/checkout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketRoutingModule, CheckoutModule,SharedModule],
})
export class BasketModule {}
