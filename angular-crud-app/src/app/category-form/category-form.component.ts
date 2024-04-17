// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-category-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './category-form.component.html',
//   styleUrl: './category-form.component.css'
// })
// export class CategoryFormComponent {

// }
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: any; // Input property to receive category data for editing
  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.formBuilder.group({
      CategoryName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.category) {
      this.categoryForm.patchValue({
        CategoryName: this.category.CategoryName
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.value.CategoryName;
      if (this.category) {
        // Editing existing category
        const categoryId = this.category.CategoryId;
        this.categoryService.updateCategory(categoryId, categoryName).subscribe(() => {
          // Handle success (e.g., show message)
        });
      } else {
        // Adding new category
        this.categoryService.addCategory(categoryName).subscribe(() => {
          // Handle success (e.g., show message)
        });
      }
    }
  }
}
