import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.oidcSecurityService.checkAuth().pipe(
      map(({ isAuthenticated }) => {
        if (!isAuthenticated) {
          this.oidcSecurityService.authorize(); // Redirect to OIDC login
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.error('Error in AuthGuard:', error);

        // Optionally redirect to an error page or login page
        this.router.navigate(['/error'], {
          state: { message: 'Authentication failed. Please try again.' },
        });

        // Return false to prevent route activation
        return of(false);
      })
    );
  }
}




//import { Injectable } from '@angular/core';
//import { CanActivate, Router } from '@angular/router';
//import { OidcSecurityService } from 'angular-auth-oidc-client';

//@Injectable({
//  providedIn: 'root',
//})
//export class AuthGuard implements CanActivate {
//  constructor(
//    private oidcSecurityService: OidcSecurityService,
//    private router: Router
//  ) { }

//  canActivate(): boolean {
//    const isAuthenticated = this.oidcSecurityService.isAuthenticated();
//    if (!isAuthenticated) {
//      this.oidcSecurityService.authorize();
//      return false;
//    }
//    return true;
//  }
//}
