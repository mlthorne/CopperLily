import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { ErrorComponent } from './error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sms-lookup',
    pathMatch: 'full',
  },
  {
    path: 'sms-lookup',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./sms-lookup/sms-lookup.component').then((m) => m.SmsLookupComponent),
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
