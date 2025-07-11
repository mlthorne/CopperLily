import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent implements OnInit {
  errorMessage: string | null = null;
  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        if (!isAuthenticated) {
          this.oidcSecurityService.authorize();
        }
      },
      error: (error) => {
        console.error('OIDC Initialization Error:', error);
        this.errorMessage = 'Failed to load authentication configuration. Please contact support.';
      },
    });
  }
}
