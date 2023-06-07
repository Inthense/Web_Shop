import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { EarnRewardsComponent } from './pages/earn-rewards/earn-rewards.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ItemsPageComponent } from './pages/items-page/items-page.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'our-products',
  component: OurProductsComponent
},
{
  path: 'discover',
  component: DiscoverComponent
},
{
  path: 'earn-rewards',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
