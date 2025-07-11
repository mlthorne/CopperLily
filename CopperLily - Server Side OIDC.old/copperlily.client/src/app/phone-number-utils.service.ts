import { Injectable } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberUtilsService {
  formatPhoneNumber(phoneNumber: string): string {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);
    return parsedNumber ? parsedNumber.formatInternational() : phoneNumber;
  }
}
