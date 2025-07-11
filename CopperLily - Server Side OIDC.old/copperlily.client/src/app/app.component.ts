import { Component } from '@angular/core';
import { SmsLookupComponent } from './sms-lookup/sms-lookup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SmsLookupComponent],

})
export class AppComponent { }
