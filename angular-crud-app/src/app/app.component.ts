// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
// import { Category } from './category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('Fetched categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
