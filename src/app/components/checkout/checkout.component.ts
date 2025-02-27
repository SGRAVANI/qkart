import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Cart } from '../interfaces';
import { Subscription } from 'rxjs';
import { ApidataService } from '../../services/apidata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnDestroy,DoCheck{
addAddressFlag:boolean=false;
newAdress!:string
cartData:Cart[]=[]
cartSubscription!:Subscription;
balance:any=localStorage.getItem('balance')
adresses:any=[]
message:any=null;
variant!:string;
seltectedAddress!:{all:any[],selected:string}

constructor(private sharedDataService:SharedDataService,
   private apiservice:ApidataService,
   private router:Router
  )
{}
addAddress()
{
  if(this.newAdress.length<20)
  {
    this.message='Address should be greater than 20 characters';
    this.variant="danger";
    return
  }
  this.apiservice.addNewAddress(this.newAdress).subscribe({
    next:(res: any)=>{this.adresses=res;
      //console.log(res)
      
     this.seltectedAddress={all:res,selected:''}
     this.message="Address Added successfully...";
     this.variant="success";
     this.newAdress=''
     this.addAddressFlag=false;
    },
    error:(error: any)=>{
  //      console.log(error)}
     if(error)
     {
      this.message=String(error).slice(6);
      this.variant='warning';
     }
     this.message="Could not add this address. Check that the backend is running, reachable and returns valid JSON";
     this.variant="danger"
    }
  })
}
handleCancelAddress()
{
  this.newAdress=''
  this.addAddressFlag=false
}
handleOpenNewAddressForm()
{
  this.addAddressFlag=true
}

ngOnInit(): void {
  this.cartSubscription=this.sharedDataService.cartData.subscribe((cartData)=>{
    this.cartData=cartData
  })

  this.apiservice.getAddresses().subscribe({
    next:(res: any)=>{this.adresses=res;
      console.log(res)
     this.seltectedAddress={all:res,selected:''}
    },
    error:(error: any)=>{
  //      console.log(error)}
     this.message="Could not fetch addresses. Check that the backend is running, reachable and returns valid JSON";
     this.variant="danger"
    }
  })

}

setAdddreses(_id:string)
{
this.seltectedAddress.selected=_id;
}
ngOnDestroy(): void {
  this.cartSubscription.unsubscribe()
}
findCartTotalAmount() {
  let total=this.cartData.reduce((sum,ele)=>sum+Number(ele.cost)*Number(ele.qty),0) 
  return total;
  }


  deleteAddress(_id: string) {
    this.apiservice.deleteSelectedAddress(_id).subscribe({
      next: (res: any) => {
        this.adresses = res;
        this.seltectedAddress = { all: res, selected: '' };
        this.message = "Address Deleted";
        this.variant = "success";
      },
      error: (error: any) => {
        if (error) {
          this.message = String(error).slice(6); // Extract backend error message if available
          this.variant = 'warning';
        } else {
          this.message = "Could not delete this address. Check that the backend is running, reachable, and returns valid JSON.";
          this.variant = "danger";
        }
      }  
    })
    
  }

   validateRequest  ()  {
    let totalCost=this.findCartTotalAmount();
    let balance:number=localStorage.getItem('balance')?Number(localStorage.getItem('balance')):0;
    if(balance<totalCost)
    {
      this.message='You do not have enough balance in your wallet for this purchase';
      this.variant='warning';
      return false;
    }
    if(this.adresses.length===0)
    {
     this.message="Please add a new address before proceeding";
     this.variant="warning";
     return false ;
    }
    if(!this.seltectedAddress.selected)
    {
      this.message="Please select one shipping address to proceed.";
      this.variant="warning"
      return false;
    }
    return true;
  };

  performCheckout()
{
if(this.validateRequest())
{

      let balance=localStorage.getItem('balance')
      let total=this.findCartTotalAmount();
      let avlBalance=Number(balance)-total;
      localStorage.setItem("balance",String(avlBalance))
    this.message = "Order placed successfully";
    this.variant = "success";
  
   
    setTimeout(()=>{
      this.sharedDataService.updateCartData([])
      localStorage.removeItem('cartData')
      this.router.navigate(['/thanks'])
    },1000)
   
  

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
}
