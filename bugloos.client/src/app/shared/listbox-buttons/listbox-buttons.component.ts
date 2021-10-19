import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../models/category';

@Component({
  selector: 'app-listbox-buttons',
  templateUrl: './listbox-buttons.component.html',
  styleUrls: ['./listbox-buttons.component.scss'],
})
export class ListboxButtonsComponent implements OnInit {
  @Input() categories: ICategory[] = [];
  @Output() categoryitemClick: EventEmitter<ICategory> =
    new EventEmitter<ICategory>();

  constructor() {}

  ngOnInit(): void {
  }

  categoryClick(item: ICategory) {
    this.categoryitemClick.emit(item);
  }
}
