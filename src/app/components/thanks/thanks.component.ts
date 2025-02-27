import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent {
balance:string|null=localStorage.getItem("balance");
constructor(private router:Router)
{

}
routeToProducts()
{
this.router.navigate(['/'])
}
}
