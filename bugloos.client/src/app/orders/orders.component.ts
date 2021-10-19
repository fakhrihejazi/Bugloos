import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { IOrderItem } from '../shared/models/order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orderitems: IOrderItem[] = [];

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.getOrders();
  }

  /**
   * Return order from server
   */
  getOrders() {
    this.orderitems = [];
    this.basketService.getOrders().subscribe(
      (response) => {
        console.log(response);
        response.forEach((element) => {
          element.orderItems.forEach((orderItem) => {
            this.orderitems.push(orderItem);
          });
        });
       
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
