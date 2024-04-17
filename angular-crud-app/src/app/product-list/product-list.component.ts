import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  pageSize = 10;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts() //this.currentPage, this.pageSize
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
}
