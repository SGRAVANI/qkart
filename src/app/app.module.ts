import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { HerosectionComponent } from './components/herosection/herosection/herosection.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayAlertComponent } from './components/display-alert/display-alert.component';
import { ApidataService } from './services/apidata.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CircularprogressComponent } from './components/circularprogress/circularprogress.component';
import { RatingComponent } from './components/rating/rating.component';
import { StartfilledComponent } from './components/startfilled/startfilled.component';
import { StartemptyComponent } from './components/startempty/startempty.component';

import { CartComponent } from './components/cart/cart.component';
import { CircularIconComponent } from './components/circular-icon/circular-icon.component';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { ItemQuantityComponent } from './components/item-quantity/item-quantity.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotfoundComponentProduct } from './components/notfoundProduct/notfoundProduct.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HerosectionComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    DisplayAlertComponent,
    ProductCardComponent,
    CircularprogressComponent,
    RatingComponent,
    StartfilledComponent,
    StartemptyComponent,
  
    CartComponent,
    CircularIconComponent,
    CartItemCardComponent,
    ItemQuantityComponent,
    CheckoutComponent,
    ThanksComponent,
    NotfoundComponent,
    NotfoundComponentProduct
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     HttpClientModule,
     ReactiveFormsModule,
  ],
  providers: [
    ApidataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
