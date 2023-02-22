import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@ngshop/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats.categories;
    })
  }

}
