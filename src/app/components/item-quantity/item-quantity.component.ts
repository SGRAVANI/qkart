import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../interfaces';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.css']
})
export class ItemQuantityComponent implements OnInit {
@Input() isReadOnly!:boolean;
@Input() cartItem!:Cart;
@Input() index!:number
cartData!:Cart[]
cartSubscription!:Subscription;
constructor(private sharedData:SharedDataService)
 {

 }
findIndex()
{
  for(let i=0;i<this.cartData.length;i++)
  {
    if(this.cartData[i]._id==this.cartItem._id)
    {
      return i;
    }
  }
  return 0;
}
handleAdd()
{
let curIndex=this.findIndex()

let arr=this.cartData;
arr[curIndex].qty+=1;
this.sharedData.updateCartData(arr)
}
handleDelete()
{
  let curIndex=this.findIndex()
  let arr=this.cartData;
  //arr[curIndex].qty-=1;
  if(arr[curIndex].qty==1)
  {
    arr.splice(curIndex,1)
  }
  else{
    arr[curIndex].qty-=1;
  }
  localStorage.setItem('cartData',JSON.stringify({'cartData':arr}))
  this.sharedData.updateCartData(arr)
}
ngOnInit(): void {
this.cartSubscription=this.sharedData.cartData.subscribe((data)=>{
  this.cartData=data;
})  
}
}
