import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-delete.html',
  
})
export class PopDeleteComponent {

  @Input() isOpen: boolean = false;
  @Input() itemId!: string | null;

  @Input() title: string = 'Confirm delete';
  @Input() message: string = 'Are you sure you want to delete this item?';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    if (!this.itemId) return;
    this.confirm.emit(this.itemId);
  }
}
