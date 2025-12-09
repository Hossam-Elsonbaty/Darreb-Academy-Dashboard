import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../models/i-category';
import { CategoriesService } from '../../services/categories/categories.service';
@Component({
  selector: 'app-add-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  @Input() isOpen: boolean = false;
  @Input() categoryToEdit: ICategory | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() categoryAdded  = new EventEmitter<ICategory>();
  @Output() refreshList = new EventEmitter<ICategory>();
  @Output() categoryUpdated  = new EventEmitter<ICategory>();
  onClose(): void {
    this.closeModal.emit();
    this.categoryProp = {} as ICategory;
  }
  ngOnChanges() {
      if (this.categoryToEdit) {
        this.categoryProp = { ...this.categoryToEdit };
      } else {
        this.categoryProp = {} as ICategory;
      }
    }
  categoryProp: ICategory = {} as ICategory;
  constructor(private categoryService: CategoriesService) {}
    handleSubmit() {
      if (this.categoryToEdit && this.categoryToEdit._id) {
        this.categoryService.updateCategory(this.categoryToEdit._id, this.categoryProp).subscribe({
          next: (res) => {
            console.log('Course updated successfully:', res);
            this.categoryUpdated.emit(res.data);
            this.closeModal.emit();
          },
          error: (error) => {
            console.error('Error updating user:', error);
          },
        });
      } else {
        this.categoryService.addNewCategory(this.categoryProp).subscribe((res) => {
        console.log('category added successfully:', res);
        this.categoryAdded.emit(res.data);
        this.refreshList.emit(res.data);
        this.closeModal.emit();
    });
      }
    }
}
