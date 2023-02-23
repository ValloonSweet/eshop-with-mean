import { Component, OnInit } from '@angular/core';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@ngshop/products';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats.categories;
    })
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe({
          next: ({status}) => {
            if(status)
            this._getCategories();
            console.log('subscribe');
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is deleted!'});
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot delete category!'});
          }
        })
      },
      reject: () => {

      }
    })

  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats.categories;
    })
  }

}
