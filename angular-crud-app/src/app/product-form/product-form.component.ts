// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './product-form.component.html',
//   styleUrl: './product-form.component.css'
// })
// export class ProductFormComponent {

// }
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any; // Input property to receive product data for editing
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      CategoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        ProductName: this.product.ProductName,
        CategoryId: this.product.CategoryId
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productName = this.productForm.value.ProductName;
      const categoryId = this.productForm.value.CategoryId;
      if (this.product) {
        // Editing existing product
        const productId = this.product.ProductId;
        this.productService.updateProduct(productId, productName, categoryId).subscribe(() => {
          // Handle success (e.g., show message)
        });
      } else {
        // Adding new product
        this.productService.addProduct(productName, categoryId).subscribe(() => {
          // Handle success (e.g., show message)
        });
      }
    }
  }
}
