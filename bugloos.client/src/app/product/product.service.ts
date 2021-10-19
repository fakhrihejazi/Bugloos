import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../shared/models/category';
import { CourseParams } from '../shared/models/courseParams';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  categories: ICategory[] = [];
  products: IProduct[] = [];
  pagination = new Pagination();
  courseParams = new CourseParams();

  constructor(private http: HttpClient) {}

  getCategory() {
    if (this.categories.length > 0) {
      return of(this.categories);
    }
    return this.http
      .get<ICategory[]>(this.baseUrl + 'Products/categories')
      .pipe(
        map((response) => {
           let allItem = { id: 0, name: 'َAll' };
        if (response.indexOf(allItem) == -1) {
          response.unshift(allItem);
        }
          this.categories = response;
          return response;
        })
      );
  }

  getProducts(useCache: boolean) {
    if (useCache === false) {
      this.products = [];
    }

    if (this.products.length > 0 && useCache === true) {
      const pagesRecived = Math.ceil(
        this.products.length / this.courseParams.pageSize
      );
      if (this.courseParams.pageNumber <= pagesRecived) {
        this.pagination.data = this.products.slice(
          (this.courseParams.pageNumber - 1) * this.courseParams.pageSize,
          this.courseParams.pageNumber * this.courseParams.pageSize
        );

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.courseParams.categoryId !== 0) {
      params = params.append(
        'categoryId',
        this.courseParams.categoryId.toString()
      );
    }

    if (this.courseParams.search) {
      params = params.append('search', this.courseParams.search);
    }

    params = params.append('sort', this.courseParams.sort);
    params = params.append('pageSize', this.courseParams.pageSize.toString());
    params = params.append(
      'pageIndex',
      this.courseParams.pageNumber.toString()
    );

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((responce) => {
          if (responce.body)
          {
             this.products = [...this.products, ...responce.body.data];
          }
           
          this.pagination = responce.body as IPagination;
          return this.pagination;
        })
      );
  }

  setCourseParams(params: CourseParams) {
    this.courseParams = params;
  }

  getCourseParams() {
    return this.courseParams;
  }

  getProduct(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
}
