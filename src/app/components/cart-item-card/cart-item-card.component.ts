import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../interfaces';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {
@Input() cartItem!:Cart
@Input() readOnly!:boolean
ngOnInit(): void {
  console.log(this.cartItem,'from cart Item')
}
}
