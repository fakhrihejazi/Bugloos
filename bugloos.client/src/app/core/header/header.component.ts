import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser$?: Observable<IUser | null>;
  basket$?: Observable<IBasket | null>;

  constructor(
    private accountUser: AccountService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountUser.currentUser$;
    this.basket$ = this.basketService.basket$;
  }

  /**
   * logout
   */
  logout() {
    this.accountUser.logout();
  }
}
