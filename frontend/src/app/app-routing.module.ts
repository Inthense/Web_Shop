import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { EarnRewardsComponent } from './pages/sales/sales.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ItemsPageComponent } from './pages/items-page/items-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { CommentComponent } from './pages/comment/comment.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'our-products',
  component: OurProductsComponent
},
{
  path: 'sales',
  component: EarnRewardsComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
},
{
  path: 'search',
  component: SearchComponent
},
{
  path: 'search/:searchTerm',
  component: SearchComponent
},
{
  path: 'items/:id',
  component: ItemsPageComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'admin-page',
  component: AdminPageComponent
},
{
  path: 'admin-page/user-search',
  component: UserSearchComponent
},
{
  path: 'admin-page/user-search/:searchTerm',
  component: UserSearchComponent
},
{
  path: 'admin-page/create-user',
  component: CreateUserComponent
},
{
  path: 'admin-page/add-item',
  component: AddItemComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
