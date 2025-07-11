import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'sms-lookup',
    loadComponent: () => import('./sms-lookup/sms-lookup.component').then(m => m.SmsLookupComponent),
  },
  { path: '', redirectTo: '/sms-lookup', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppComponent,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


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
