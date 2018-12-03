import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { Category } from 'src/app/models/category';
import { QueryService } from 'src/app/services/query.service';
import {
  LoadInitialProductPage,
  LoadNextProductPage
} from 'src/app/store/actions/product.action';
import { ProductPage } from 'src/app/models/product-page/product-page';
import {
  SetCurrentSubCategory,
  SetCurrentCategory
} from 'src/app/store/actions/category.action';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  private paramSub: any;
  private catSub: any;
  private pageSub: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>
  ) {}
  id: string;
  category: Category;
  loading: boolean;
  ngOnInit() {
    this.loading = true;
    this.paramSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.pageSub = this.store.select('products').subscribe(page => {
        this.loading = page.loading;
      });
      this.catSub = this.store.select('categories').subscribe(categoryState => {
        this.loading = categoryState.loading;
        this.category = categoryState.categories.find(
          cat => cat.id === this.id
        );
      });

      this.store.dispatch(new SetCurrentCategory(this.category));
    });
  }

  onClick(categoryId: string) {
    this.store.dispatch(new LoadInitialProductPage(categoryId));
  }
  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.catSub.unsubscribe();
  }
}
