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
  @Output() closeModal = new EventEmitter<void>();
  @Output() categoryAdded  = new EventEmitter<ICategory>();
  onClose(): void {
    this.closeModal.emit();
  }
  categoryProp: ICategory = {} as ICategory;
  constructor(private categoryService: CategoriesService) {}
  addNewCategory() {
    this.categoryService.addNewCategory(this.categoryProp).subscribe((data) => {
      console.log('category added successfully:', data);
      this.categoryAdded.emit(data);
      this.closeModal.emit();
    });
  }
}
