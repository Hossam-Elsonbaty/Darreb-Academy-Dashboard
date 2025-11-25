import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-user-modal-component',
  imports: [],
  templateUrl: './add-user-modal-component.html',
  styleUrl: './add-user-modal-component.css',
})
export class AddUserModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
}
