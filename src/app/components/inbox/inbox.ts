import { ChangeDetectorRef, Component } from '@angular/core';
import { IInbox } from '../../models/i-inbox';
import { InboxService } from '../../services/Inbox/inbox.service';

@Component({
  selector: 'app-inbox',
  imports: [],
  templateUrl: './inbox.html',
  styleUrl: './inbox.css',
})
export class Inbox {
  allInboxes!: IInbox[];
  isDeleteModalOpen: boolean = false;
  inboxIdToDelete: string | null = null;
  isMsgModalOpen: boolean = false;
selectedInboxForMsg: IInbox | null = null;
  replyMessage: string = '';
  constructor(private Inboxes: InboxService, private cd: ChangeDetectorRef) {
    this.Inboxes.getAllInboxes().subscribe({
      next: (data) => {
        console.log("Inbox data from API:", data);
        this.allInboxes = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }
openDeleteModal(id: string) {
   console.log("Open delete modal for ID:", id);
  this.inboxIdToDelete = id;
  this.isDeleteModalOpen = true;
}

  cancelDelete() {
    this.inboxIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }
confirmDeleteYes() {
    console.log("Confirm delete clicked, ID:", this.inboxIdToDelete);
  if (!this.inboxIdToDelete) return;

  const idToDelete = this.inboxIdToDelete;

  this.Inboxes.deleteInbox(idToDelete).subscribe({
    next: () => {
      console.log("Deleted from backend:", idToDelete);
      this.allInboxes = this.allInboxes.filter(inbox => inbox.id !== idToDelete);
      this.cancelDelete();
    },
    error: (err) => console.error("Delete error:", err)
  });
}
openMsgModal(inbox: IInbox) {
  this.selectedInboxForMsg = inbox;
  this.isMsgModalOpen = true;
  this.replyMessage = '';
}
closeCommentModal() {
  this.selectedInboxForMsg = null;
  this.isMsgModalOpen = false;
}
  sendReply(msg: string) {
     console.log("Msg sent:", msg, "to inbox:", this.selectedInboxForMsg);
    this.closeCommentModal();
}
}
