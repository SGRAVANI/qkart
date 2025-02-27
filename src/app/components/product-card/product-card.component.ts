import { Component,DoCheck,Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Product,Cart } from '../interfaces';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})



export class ProductCardComponent implements DoCheck, OnInit,OnDestroy {
@Input() product!:Product;
message:string|null=null;
variant:string=''
cartData:Cart[]=[]
dataSubscription!:Subscription;
// product={category: "Fashion",
  // cost: 50,
  // image: "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/42d4d057-8704-4174-8d74-e5e9052677c6.png",
  // name: "UNIFACTOR Mens Running Shoes",
  // rating: 5,
  // _id: "BW0jAAeDJmlZCF8i"
  // }

  constructor(private sharedata:SharedDataService){}

  handleAddToCart()
  {
   let token=localStorage.getItem('token')
   if(!token)
   {
  this.message="Login to add an item to the Cart"
  this.variant="warning"
  return
   }
   console.log("selected item is",this.product)
   if(this.isItemInCart(this.cartData,this.product._id))
   {
    console.log('item exists')
    this.message="Item already in cart. Use the cart sidebar to update quantity or remove item.",
    this.variant='warning';
    return;
   }
   else{
    let cartElement:Cart={...this.product,qty:1}

    this.sharedata.updateCartData([...this.cartData,cartElement])
    console.log(this.cartData)
  }
  }
  ngDoCheck(): void {
    //console.log(this.message)
   if(this.message)
   {
    setTimeout(()=>{
     this.message=null;
     this.variant='';
    },5000)
   }
  }

 isItemInCart (items:Cart[], productId:string) {
    //let items=generateCartItemsFrom(cartItem,product);
    let ans=false; 
    for(let ele of items)
    {
      if(ele._id===productId)
      {
        return true;
      }
    }
    return ans;
  };
  ngOnInit(): void {
   this.dataSubscription= this.sharedata.cartData.subscribe((data:Cart[])=>{
      this.cartData=data
    })
  }
ngOnDestroy(): void {
  this.dataSubscription.unsubscribe()
}
}
