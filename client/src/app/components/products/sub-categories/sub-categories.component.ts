import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { ApplicationState } from 'src/app/store';
import { SetCurrentCategory } from 'src/app/store/actions/category.action';
import { LoadInitialProductPage } from 'src/app/store/actions/product.action';

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
