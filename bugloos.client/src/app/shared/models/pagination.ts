import { IProduct } from './product';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

export class Pagination implements IPagination {
  constructor() {
    this.pageSize = 20;
    this.pageIndex = 0;
    this.data = [];
    this.count = 20;
  }
  pageIndex: number = 0;
  pageSize: number = 20;
  count: number = 20;
  data: IProduct[] = [];
}
