import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductItem } from 'src/app/models/product-page/product-item';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  constructor() {}
  @Input() productItem: ProductItem;
  @Output() emitAddToCart = new EventEmitter<ProductItem>();
  ngOnInit() {}
  addToCart(item: ProductItem) {
    this.emitAddToCart.emit(item);
  }
}
