import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  selectedItems: string[];
  constructor(private qrySvc: QueryService) {}

  ngOnInit() {
    this.selectedItems = [];
    this.qrySvc.getCategories().subscribe(res => {
      this.categories = res.categories;
    });
  }
  show(listItemId: string): boolean {
    return this.selectedItems.includes(listItemId);
  }

  listItemClick(listItemId: string): void {
    if (!this.selectedItems.includes(listItemId)) {
      this.selectedItems.unshift(listItemId);
    } else if (this.selectedItems[0] === listItemId) {
      this.selectedItems.shift();
    }
    this.selectedItems = this.selectedItems.filter(
      item => item === listItemId || item === listItemId.split('_')[0]
    );

    console.log(this.selectedItems);
  }

  trackByFn(index: number, category: Category): string {
    return category ? category.id : undefined;
  }
}
