import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

//import { bootstrapApplication } from '@angular/platform-browser';
//import { provideRouter } from '@angular/router';
//import { routes } from './app/app-routing.module';
//import { importProvidersFrom } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';
//import { AppModule } from './app/app.module';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//platformBrowserDynamic()
//  .bootstrapModule(AppModule)
//  .catch(err => console.error(err));
