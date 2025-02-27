import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { Cart } from '../components/interfaces';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  storedCart = localStorage.getItem('cartData');

  data = this.storedCart ? JSON.parse(this.storedCart).cartData : null;
  cartData=new BehaviorSubject<Cart[]>(this.data?this.data:[])
  constructor() { }
  updateCartData(newData:Cart[])
  {
   this.cartData.next(newData)
  }
}
