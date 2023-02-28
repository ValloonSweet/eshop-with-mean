import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ngshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this._getProducts();
  }

  deleteProduct (id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id).subscribe({
          next: ({status}) => {
            if(status)
            this._getProducts();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product is deleted!'});
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cannot delete product!'});
          }
        })
      },
      reject: () => {

      }
    })
  }

  editProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe({
      next: ({products}) => {
        this.products = products;
      }
    })
  }
}
