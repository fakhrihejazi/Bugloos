import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';
import { IOrderItem } from 'src/app/shared/models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() isBasket = true;
  @Input() isOrder = false;

  constructor() {}

  ngOnInit(): void {}
}
