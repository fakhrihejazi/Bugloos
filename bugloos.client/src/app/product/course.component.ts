import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from '../shared/models/category';
import { CourseParams } from '../shared/models/courseParams';
import { IProduct } from '../shared/models/product';
import { ProductService } from './product.service';

import {
  concat,
  fromEvent,
  merge,
  observable,
  Observable,
  ReplaySubject,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Pagination } from '../shared/models/pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  errors: string[] = [];
  showError: boolean = false;

  categories: ICategory[] = [];
  products: IProduct[] = [];
  obsProduct$: Observable<IProduct[]>;

  totalCount: number = 0;
  courseParams: CourseParams;

  @ViewChild('search', { static: false }) searchTerm: any;

  constructor(private productService: ProductService) {
    this.courseParams = this.productService.getCourseParams();
    this.obsProduct$ = new Observable<IProduct[]>();
  }

  ngOnInit(): void {
    this.getCategories();
  }
  /**
   * call product Method And event observabe SearchBox
   */
  ngAfterViewInit(): void {
    const initialProduct$ = this.getProducts();
    this.obsProduct$ = merge(initialProduct$, this.addkeyEventSearch());
  }
  /**
   * Add event observable to search Box
   * @returns
   */
  addkeyEventSearch() {
    return fromEvent<any>(this.searchTerm.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.onSearch(search))
    );
  }

  getCategories() {
    this.productService.getCategory().subscribe(
      (result) => {
        this.categories = result;
      },
      (error) => {
        this.showError = true;
        this.errors.push(error.message);
      }
    );
  }

  getProducts(useCache = false): Observable<IProduct[]> {
    return this.productService.getProducts(useCache).pipe(
      map((response: any): IProduct[] => {
        this.products = response.data;
        this.totalCount = response.count;
        return response.data;
      })
    );
  }
  /**
   *
   * @param categorySelect filter product with category Id selected
   */
  onCategorySelect(categorySelect: ICategory) {
    console.log(categorySelect);
    const params = this.productService.getCourseParams();
    params.categoryId = categorySelect.id;
    params.pageNumber = 1;
    this.productService.setCourseParams(params);
    const initialProduct$ = this.getProducts();
    this.obsProduct$ = merge(initialProduct$, this.addkeyEventSearch());
  }

  /**
   *
   * @param event number page select go ro next old pre page
   */

  onPageChanged(event: any) {
    const params = this.productService.getCourseParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.productService.setCourseParams(params);
      const initialProduct$ = this.getProducts();
      this.obsProduct$ = merge(initialProduct$, this.addkeyEventSearch());
    }
  }
  /**
   *
   * @param search filter product with text name product
   * @returns
   */
  onSearch(search: string): Observable<IProduct[]> {
    console.log(search);
    const params = this.productService.getCourseParams();
    params.search = this.searchTerm.nativeElement.value;
    console.log('param', params.search);
    this.productService.setCourseParams(params);

    return this.getProducts();
  }
}
