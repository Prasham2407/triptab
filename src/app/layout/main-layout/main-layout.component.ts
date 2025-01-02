import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  currentRoute: string = '';
  pendingRequestsCount: number = 5; // This should come from a service

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.router.navigate(['/login']);
    // this.authService.logout();
  }
} 