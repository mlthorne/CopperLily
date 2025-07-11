import { Component } from '@angular/core';
import { SmsLookupComponent } from './sms-lookup/sms-lookup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SmsLookupComponent], // Import SmsLookupComponent here

})
export class AppComponent { }

//import { HttpClientModule } from '@angular/common/http';
//import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';
//import { RouterModule, Routes } from '@angular/router';
//import { SmsLookupComponent } from './sms-lookup/sms-lookup.component';

//export const routes: Routes = [
//  {
//    path: 'sms-lookup',
//    loadComponent: () => import('./sms-lookup/sms-lookup.component').then(m => m.SmsLookupComponent)
//  },
//  { path: '', redirectTo: '/sms-lookup', pathMatch: 'full' }
//];

//@NgModule({
//  imports: [
//    RouterModule.forRoot(routes),
//    BrowserModule,
//    HttpClientModule,
//    FormsModule,
//  ],
//  providers: [],
//  exports: [RouterModule]
//})
//export class AppModule { }
//export class AppRoutingModule { }
