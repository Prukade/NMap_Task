// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    { path: 'categories', component: CategoryListComponent },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/categories', pathMatch: 'full' },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
