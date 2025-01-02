import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {}

  login(credentials: { email: string; password: string }): void {
    // Implement your login logic here
    localStorage.setItem('auth_token', 'dummy_token');
    this.isAuthenticatedSubject.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticated(){
    return true;
  }
} 