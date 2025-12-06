import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-delete',
  templateUrl: './pop-delete.html',
})
export class PopDeleteComponent {
  @Input() isOpen: boolean = false;
  @Input() itemId!: string | null;

  @Input() title: string = '';
  @Input() message: string = '';

  @Output() confirm = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  onOverlayClick() {
    this.close.emit();
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

  onConfirm() {
    if (this.itemId) {
      this.confirm.emit(this.itemId);
    }
  }

  onClose() {
    this.close.emit();
  }
}
