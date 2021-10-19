import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListboxButtonsComponent } from './listbox-buttons.component';

describe('ListboxButtonsComponent', () => {
  let component: ListboxButtonsComponent;
  let fixture: ComponentFixture<ListboxButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListboxButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListboxButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
