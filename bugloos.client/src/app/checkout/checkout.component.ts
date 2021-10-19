import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import {
  IOrder,
  IOrderCreate,
  IOrderItem,
  OrderCreate,
} from '../shared/models/order';

import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  errors: string[] = [];
  showError: boolean = false;
  showSuccess: boolean = false;
  constructor(private basketService: BasketService, private router: Router) {}

  ngOnInit(): void {
    this.checkOutSave();
  }

  checkOutSave() {
    const basket = this.basketService.getCurrentBasketValue();

    if (basket) {
      const orderToCreate = this.getOrderToCreate(basket);
      this.basketService.Addcheckout(orderToCreate).subscribe(
        (res) => {
          /**delete from localStorage */
          this.basketService.deleteBasket(basket);
          this.showSuccess = true;
          /**redirect to home page */
          this.router.navigateByUrl('');
        },
        (error) => {
          this.errors.push(error.message);
          this.showError = true;
        }
      );
    }
  }

  getOrderToCreate(basket: IBasket) {
    let order: IOrderCreate = new OrderCreate();

    basket.items.forEach((element) => {
      order.orderItems.push(this.getOrderItem(element));
    });

    return order;
  }

  getOrderItem(basketItem: IBasketItem): IOrderItem {
    return {
      productId: basketItem.id,
      productName: basketItem.productName,
      pictureUrl: basketItem.pictureUrl,
      price: basketItem.price,
      quantity: basketItem.quantity,
    };
  }
}
