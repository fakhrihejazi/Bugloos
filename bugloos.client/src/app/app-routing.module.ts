import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: null },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('src/app/account/account.module').then((mod) => mod.AccountModule),
    data: { breadcrumb: '' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('src/app/basket/basket.module').then((mod) => mod.BasketModule),
    data: { breadcrumb: 'Basket' },
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('src/app/checkout/checkout.module').then(
        (mod) => mod.CheckoutModule
      ),
    data: { breadcrumb: 'CheckOut' },
    canActivate: [AuthGuard],
  },

  {
    path: 'orders',
    loadChildren: () =>
      import('src/app/orders/orders.module').then((mod) => mod.OrdersModule),
    data: { breadcrumb: 'Profile' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
