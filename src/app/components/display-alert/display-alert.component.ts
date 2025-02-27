import { Component ,Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-alert',
  templateUrl: './display-alert.component.html',
  styleUrls: ['./display-alert.component.css']
})
export class DisplayAlertComponent implements OnInit, OnDestroy {
@Input() message!:any;
@Input() variant!:string;
ngOnInit(): void {
 
}
ngOnDestroy(): void {
  console.log("removed")
}
}
