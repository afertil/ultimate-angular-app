import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.authState
      .map((user) => {
        if (!user) {
          this.router.navigate(['auth/login']);
        }

        return !!user;
      });
  }
}
