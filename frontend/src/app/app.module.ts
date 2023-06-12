import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { EarnRewardsComponent } from './pages/earn-rewards/earn-rewards.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';
import { ItemsPageComponent } from './pages/items-page/items-page.component';
import { CurrentPageComponent } from './pages/current-page/current-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    OurProductsComponent,
    DiscoverComponent,
    EarnRewardsComponent,
    ProfileComponent,
    CartComponent,
    SearchComponent,
    ItemsPageComponent,
    CurrentPageComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
