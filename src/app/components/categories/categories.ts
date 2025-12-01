import { Component, ChangeDetectorRef } from '@angular/core';
import { ICategory } from '../../models/i-category';
import { CategoriesService } from '../../services/categories/categories.service';
import { AddCategory } from '../add-category/add-category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [AddCategory,CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  allCategories!: ICategory[];
  constructor(private Categories: CategoriesService, private cd: ChangeDetectorRef) {
    this.Categories.getAllCategories().subscribe((data) => {
      this.allCategories = data;
      console.log(data);
      this.cd.detectChanges();
    });
  }
  isModalOpen: boolean = false;
  openModal(): void {
    this.isModalOpen = true;
    console.log('modal opened');
  }
  closeModalHandler(): void {
    this.isModalOpen = false;
  }
  onCategoryCreated(categoryData: ICategory): void {
    console.log('New category data:', categoryData);
    this.allCategories.push(categoryData);
    this.closeModalHandler();
  }
}
