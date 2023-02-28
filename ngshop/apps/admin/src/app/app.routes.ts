import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';

export const appRoutes: Route[] = [{
    path: '',
    component: ShellComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'categories',
            component: CategoriesListComponent
        },
        {
            path: 'categories/form',
            component: CategoriesFormComponent
        },
        {
            path: 'products/form/:id',
            component: ProductsFormComponent
        },{
            path: 'products',
            component: ProductsListComponent
        },
        {
            path: 'products/form',
            component: ProductsFormComponent
        },
        {
            path: 'products/form/:id',
            component: ProductsFormComponent
        }
    ]
}];
