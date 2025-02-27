import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApidataService } from 'src/app/services/apidata.service';
import { debounceTime, distinctUntilChanged, Subject ,map} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
products:Product[]=[]
originalProducts:Product[]=[]
searchStatus:string=''
searchInput=''
isLogin!:boolean
token:string|null=localStorage.getItem('token')
searchText$=new Subject<string>(); // Subject to receive input from child
constructor(private apiservice:ApidataService)
{
  

}
  ngOnInit(): void {
   this.apiservice.getProducts().subscribe({
    next:(res)=>{this.products=res;
      this.originalProducts=res;
     },
    error:(error)=>{console.log(error)}
  })
 

  this.searchText$.pipe(debounceTime(300),
  distinctUntilChanged(),
  map((value)=>value.trim().toLowerCase())
).subscribe((value)=>{
  this.serach(value)
})
  
}
ngDoCheck()
{
if(window.localStorage.getItem('login'))
{
  this.isLogin=true;
}
}
handleChange(input:string)
{
  this.searchStatus=''
  this.searchInput=input;
//console.log(input)
//this.serach(input)
//console.log(this.searchStatus)
this.searchText$.next(input)
}

serach(inp:string)
{
  
  if(this.products.length>0)
  {
  let result=this.originalProducts.filter((ele)=>{
    
    return ele.name.toLowerCase().includes(inp.toLowerCase())||ele.name.toLowerCase().startsWith(inp.toLowerCase())})
  console.log(result) 
  if(result.length>0)
  {
    this.products=result
  }
  else{
    if(inp.length>0 && result.length==0)
    {
      this.searchStatus="No Products Found";
     // this.products=[]
    }
     if(inp.length==0 && result.length==0)
    {
      this.products=this.originalProducts
    }
  }
  
}
}
}
