import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-page-nav',
  templateUrl: './product-page-nav.component.html',
  styleUrls: ['./product-page-nav.component.css']
})
export class ProductPageNavComponent implements OnInit {
  constructor() {}
  @Input() name: string;
  @Input() id: string;
  @Input() totalPages: string;
  @Input() isFirstPage: boolean;
  @Input() currentPageNumber: string;
  @Input() isLastPage: boolean;
  @Output() getNext = new EventEmitter<void>();
  @Output() getPrevious = new EventEmitter<void>();

  next() {
    this.getNext.emit();
  }
  previous() {
    this.getPrevious.emit();
  }
  ngOnInit() {}
}
