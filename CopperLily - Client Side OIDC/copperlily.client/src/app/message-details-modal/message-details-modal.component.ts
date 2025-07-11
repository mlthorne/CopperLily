import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';
import { PhoneNumberUtilsService } from '../phone-number-utils.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-message-details-modal',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  template: `
  <h1 mat-dialog-title>Message Details</h1>
  <div mat-dialog-content>
    <p><strong>Date Created:</strong> {{ data.dateCreated  | date: 'long' }}</p>
    <p><strong>Date Sent:</strong> {{ data.dateSent | date: 'long' }}</p>
    <p><strong>Date Received:</strong> {{ data.dateReceived | date: 'long' }}</p>
    <p><strong>From:</strong> {{ phoneNumberUtils.formatPhoneNumber(data.from) }}</p>
    <p><strong>To:</strong> {{ phoneNumberUtils.formatPhoneNumber(data.to) }}</p>
    <p><strong>Body:</strong> {{ data.body }}</p>
    <p><strong>Status: </strong>
      <ng-container *ngIf="data.errorCode !== 'None'; else noError">
        <a [href]="'https://www.twilio.com/docs/messaging/api/message-resource#message-status-values'" target="_blank" rel="noopener noreferrer">
          {{ data.status | capitalize }}
        </a>
      </ng-container>
      <ng-template #noError>{{ data.status | capitalize }}</ng-template>
    </p>
    <p><strong>Error Code: </strong> 
      <ng-container *ngIf="data.errorCode !== 'None'; else noError">
        <a [href]="'https://www.twilio.com/docs/api/errors/' + data.errorCode" target="_blank" rel="noopener noreferrer">
          {{ data.errorCode }}
        </a>
      </ng-container>
      <ng-template #noError>{{ data.errorCode }}</ng-template>
    </p>
    <p><strong>Error Message: </strong> {{ data.errorMessage }}</p>
  </div>
<div mat-dialog-actions>
  <button mat-button (click)="closeDialog()">Close</button>
</div>
`,
  styleUrls: ['./message-details-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageDetailsModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public phoneNumberUtils: PhoneNumberUtilsService,
    private dialogRef: MatDialogRef<MessageDetailsModalComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
