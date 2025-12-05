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
      if (this.categoryToEdit && this.categoryToEdit.id) {
        this.categoryService.updateCategory(this.categoryToEdit.id, this.categoryProp).subscribe({
          next: (updatedCategory) => {
            console.log('Course updated successfully:', updatedCategory);
            this.categoryUpdated.emit(updatedCategory);
            this.closeModal.emit();
          },
          error: (error) => {
            console.error('Error updating user:', error);
          },
        });
      } else {
        this.categoryService.addNewCategory(this.categoryProp).subscribe((data) => {
        console.log('category added successfully:', data);
        this.categoryAdded.emit(data);
        this.refreshList.emit(data);
        this.closeModal.emit();
    });
      }
    }
}
