export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
}

export interface IOrderCreate { 
  orderItems: IOrderItem[]; 
}

export class OrderCreate implements IOrderCreate {
 
  orderItems: IOrderItem[] = [];
}

export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
