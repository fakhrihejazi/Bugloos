import {
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  imgheader: string = '';
 
  currentUser$?: Observable<IUser | null>;

  constructor(
    private router: Router,  
    private accountUser: AccountService
  ) {}

  ngOnInit(): void {

    /**set url show image header */    
    this.showimageHeader();
    /** read current user */      
    this.currentUser$ = this.accountUser.currentUser$;
  }

  showimageHeader() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((res: any) => {
        const lastRoutePart = res.url?.split('/').pop();

        switch (lastRoutePart) {
          case 'register':
            this.imgheader =
              "url('../../../assets/images/register-header.png')";
            break;
          case 'login':
            this.imgheader =
              "url('../../../assets/images/register-header.png')";
            break;
        }
      });
  }
}
