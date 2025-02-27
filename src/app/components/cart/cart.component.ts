import { Component, Input, OnDestroy, OnInit,HostListener } from '@angular/core';
import { Cart } from '../interfaces';
import { SharedDataService } from 'src/app/services/shared-data.service';
import {  Subscription } from 'rxjs';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 @Input() readOnly!:boolean;
  cartData!:Cart[]
 cartSubscription!:Subscription;
 
 constructor(
 
  private sharedDataService:SharedDataService,
  private router:Router)
 { }
ngOnInit(): void {
  this.cartSubscription=this.sharedDataService.cartData.subscribe(
    (res:Cart[])=>{
      this.cartData=res
    }),
    (error:Error)=>{
      console.log("error occured while fetching data",error)
    }
 }

 redirectToCheckout()
 {
  this.router.navigate(['/checkout'])
 }
 findTotal() {
 let total=this.cartData.reduce((sum,ele)=>sum+Number(ele.cost)*Number(ele.qty),0) 
 return total;
 }
 getTotalItems()
 {
  let totalItems=this.cartData.reduce((sum,ele)=>sum+=ele.qty,0)
  return totalItems;
 }
 @HostListener('window:beforeunload', ['$event'])
  saveCartDataBeforeUnload(event: Event) {
    if (this.cartData.length > 0) {
      console.log('Stored cart data to localStorage before reload');
      localStorage.setItem("cartData", JSON.stringify({ cartData: this.cartData }));
    }
  }
}
