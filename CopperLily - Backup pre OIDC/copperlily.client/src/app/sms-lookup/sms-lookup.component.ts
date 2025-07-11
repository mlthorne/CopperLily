import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessageDetailsModalComponent } from '../message-details-modal/message-details-modal.component';
import { CapitalizePipe } from '../capitalize.pipe';
import { PhoneNumberUtilsService } from '../phone-number-utils.service';


@Component({
  selector: 'app-sms-lookup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    CapitalizePipe
  ],
  templateUrl: './sms-lookup.component.html',
  styleUrls: ['./sms-lookup.component.css']
})
export class SmsLookupComponent {
  phoneNumber: string = '';
  messageLimit: number = 5;
  dateSentBefore: string = '';
  dateSentAfter: string = '';
  messages: any[] = [];
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public phoneNumberUtils: PhoneNumberUtilsService
  ) {}

  lookupMessages(): void {
    if (!this.phoneNumber) {
      this.errorMessage = 'Please enter a valid phone number.';
      return;
    }

    if (this.dateSentAfter && isNaN(Date.parse(this.dateSentAfter))) {
      this.errorMessage = 'Invalid "Date Sent After" value.';
      return;
    }

    if (this.dateSentBefore && isNaN(Date.parse(this.dateSentBefore))) {
      this.errorMessage = 'Invalid "Date Sent Before" value.';
      return;
    }

    const params: any = {
      phoneNumber: this.phoneNumber,
      limit: this.messageLimit,
    };

    if (this.dateSentAfter) {
      params.dateSentAfter = this.dateSentAfter;
    }

    if (this.dateSentBefore) {
      params.dateSentBefore = this.dateSentBefore;
    }

    this.http.get<any[]>(`/api/twilio/messages?phoneNumber=${encodeURIComponent(this.phoneNumber)}&limit=${this.messageLimit}`)
      .subscribe(
        (result) => {
          console.log('lookupMessages() API Response:', result);
          this.messages = result;
          this.errorMessage = '';
        },
        (error) => {
          console.error('lookupMessages() API Error:', error);
          this.errorMessage = 'Failed to retrieve messages. Please try again.';
        }
      );
  }

  fetchMessageDetails(sid: string): void {
    this.http.get<any>(`/api/twilio/message-details?sid=${encodeURIComponent(sid)}`)
      .subscribe(
        (response) => {
          console.log('fetchMessageDetails() API Response:', response);
          this.dialog.open(MessageDetailsModalComponent, {
            data: {
              status: response.status,
              errorCode: response.errorCode,
              errorMessage: response.errorMessage,
              dateCreated: response.dateCreated,
              dateSent: response.dateSent,
              dateReceived: response.dateReceived,
              from: response.from,
              to: response.to,
              body: response.body
            }
          });
        },
        (error) => {
          console.error('Failed to fetch message details:', error);
        }
      );
  }
}
