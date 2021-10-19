import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';
import { IOrder, IOrderCreate, IOrderItem } from '../shared/models/order';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  private shipping = 0;

  constructor(private http: HttpClient) {}

  /**
   * add basket to local storage
   * @returns IBasket
   */
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    localStorage.setItem('basket_item', JSON.stringify(basket));
    return basket;
  }

  /**
   * Add product to basket
   * @param item  product
   * @param quantity  count = 1
   */
  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  /**
   * update product when multi select
   * @param items
   * @param itemToAdd
   * @param quantity
   * @returns
   */

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  /**
   * return value form observable value
   * @returns
   */
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  private setBasket(basket: IBasket) {
    localStorage.setItem('basket_id', basket.id);
    localStorage.setItem('basket_item', JSON.stringify(basket));
    this.basketSource.next(basket);
    this.calculateTotals();
  }

  getBasket(id: string) {
    let basket = localStorage.getItem('basket_id');
    let basketItem = localStorage.getItem('basket_item');
    if (basketItem) {
      let basketItem_object = JSON.parse(basketItem);
      this.basketSource.next(basketItem_object);
      this.calculateTotals();
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const shipping = this.shipping;
      const subtotal = basket.items.reduce(
        (a, b) => b.price * b.quantity + a,
        0
      );
      const total = subtotal + shipping;
      this.basketTotalSource.next({ shipping, subtotal, total });
    }
  }

  deleteBasket(basket: IBasket) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
    localStorage.removeItem('basket_item');
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productId: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      category: item.category,
    };
  }

  /**
   * save basket to server
   * @param item
   * @returns
   */
  Addcheckout(item: IOrderCreate) {
    return this.http.post(this.baseUrl + 'orders', item);
  }
  /**
   *
   * @returns get order from serve
   */
  getOrders() {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders').pipe();
  }
}
