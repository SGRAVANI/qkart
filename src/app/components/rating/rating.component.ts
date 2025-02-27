import { Component,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() rating!: number;
  filled!: number[];
  empty!: number[];

  constructor() {
    this.filled = [];
    this.empty = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  private updateStars(): void {
    this.filled = new Array(this.rating).fill(1);
    this.empty = new Array(5 - this.rating).fill(1);
  }
}
