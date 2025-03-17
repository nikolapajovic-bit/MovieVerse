import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'details/:id/order',
    component: OrderComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
