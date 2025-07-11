import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  template: `
    <h1>An error has occurred! This is the error component</h1>
    <p>{{ errorMessage }}</p>
  `,
})
export class ErrorComponent {
  errorMessage: string;

  constructor(private router: Router) {
    this.errorMessage =
      this.router.getCurrentNavigation()?.extras.state?.['message'] ||
      'An unknown error occurred.';
  }
}
