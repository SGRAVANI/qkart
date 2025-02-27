import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-icon',
  templateUrl: './circular-icon.component.html',
  styleUrls: ['./circular-icon.component.css']
})
export class CircularIconComponent {
@Input() size!:boolean;

}
