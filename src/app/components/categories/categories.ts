import { Component, ChangeDetectorRef } from '@angular/core';
import { ICategory } from '../../models/i-category';
import { CategoriesService } from '../../services/categories/categories.service';
import { AddCategory } from '../add-category/add-category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [AddCategory, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  allCategories!: ICategory[];
  isDeleteModalOpen: boolean = false;
  categoryIdToDelete: string | null = null;

  constructor(private Categories: CategoriesService, private cd: ChangeDetectorRef) {
    this.Categories.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        console.log(data);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }
  isModalOpen: boolean = false;
  openModal(category?: ICategory): void {
    this.isModalOpen = true;
    if (category) {
      this.selectedCategory = category;
    } else {
      this.selectedCategory = null;
    }
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
  onCategoryUpdate(categoryData: ICategory): void {
    console.log('New category data:', categoryData);
    const updatedCategoryIndex = this.allCategories.findIndex((ele) => ele._id == categoryData._id);
    this.allCategories[updatedCategoryIndex] = categoryData;
    this.closeModalHandler();
  }
  selectedCategory: ICategory | null = null;
  updateCategory(id: string): void {
    const categoryToEdit = this.allCategories.find((cat) => cat._id === id);
    if (categoryToEdit) {
      this.openModal(categoryToEdit);
    }
  }
  openDeleteModal(id: string) {
    this.categoryIdToDelete = id;
    this.isDeleteModalOpen = true;
  }
  cancelDelete() {
    this.categoryIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }

  confirmDeleteYes() {
    if (this.categoryIdToDelete) {
      this.Categories.deleteCategory(this.categoryIdToDelete).subscribe({
        next: () => {
          this.allCategories = this.allCategories.filter(
            (cat) => cat._id !== this.categoryIdToDelete
          );
          console.log('category deleted and table updated!');
          this.cancelDelete();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
