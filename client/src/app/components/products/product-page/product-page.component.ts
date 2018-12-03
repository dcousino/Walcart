import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicatonState } from 'src/app/store';
import {
  LoadNextProductPage,
  LoadPreviousPage
} from 'src/app/store/actions/product.action';
import { ProductPage } from 'src/app/models/product-page/product-page';
import { ProductItem } from 'src/app/models/product-page/product-item';
import { Category } from 'src/app/models/category';
import { AddToCart } from 'src/app/store/actions/cart.action';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ApplicatonState>
  ) {}
  nextPage: string;
  private paramSub: any;
  private storeSub: any;
  id: string;
  currentPage: ProductPage;
  currentCategory: Category;
  loading: boolean;
  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.storeSub = this.store.select('products').subscribe(page => {
        this.loading = page.loading;
        if (page.pages.length === 0) {
          this.router.navigate(['categories']);
        }
        this.nextPage = page.pages[+this.id].nextPage;
        this.currentPage = page.pages[+this.id];
        this.currentPage.items = this.currentPage.items.filter(
          item => item.stock.toLocaleLowerCase() !== 'not available'
        );
      });
    });

    this.store.select('categories').subscribe(cat => {
      this.currentCategory = cat.currentCategory;
    });
  }
  addToCart(item: CartItem) {
    item.standardShipRate =
      typeof item.standardShipRate === undefined ? 0 : item.standardShipRate;
    item.salePrice = typeof item.salePrice === undefined ? 0 : item.salePrice;
    item.quantity = 1;
    item.totalCost = item.salePrice;
    this.store.dispatch(new AddToCart(item));
  }
  getNext() {
    this.store.dispatch(new LoadNextProductPage(this.nextPage));
  }
  getPrevious() {
    this.store.dispatch(new LoadPreviousPage());
  }
  trackByFn(index: number, product: ProductItem): number {
    return product ? product.itemId : undefined;
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.storeSub.unsubscribe();
  }
}
