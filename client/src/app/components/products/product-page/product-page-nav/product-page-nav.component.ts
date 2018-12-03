import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-page-nav',
  templateUrl: './product-page-nav.component.html',
  styleUrls: ['./product-page-nav.component.css']
})
export class ProductPageNavComponent implements OnInit {
  constructor() {}
  @Input() name: string;
  @Input() id: string;

  @Output() getNext = new EventEmitter<void>();
  @Output() getPrevious = new EventEmitter<void>();

  next() {
    this.getNext.emit();
  }
  previous() {
    console.log('clicked pre');

    this.getPrevious.emit();
  }
  ngOnInit() {}
}
