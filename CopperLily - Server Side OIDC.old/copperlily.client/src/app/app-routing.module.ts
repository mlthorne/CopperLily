import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sms-lookup',
    loadComponent: () => import('./sms-lookup/sms-lookup.component').then(m => m.SmsLookupComponent),
  },
  { path: '', redirectTo: '/sms-lookup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
