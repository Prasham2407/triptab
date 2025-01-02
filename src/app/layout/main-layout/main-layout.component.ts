import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface Notification {
  id: number;
  type: 'travel_request' | 'travel_approved' | 'reimbursement_request' | 'reimbursement_approved';
  title: string;
  description: string;
  time: Date;
  read: boolean;
  data?: any;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [MessageService]
})
export class MainLayoutComponent implements OnInit {
  currentRoute: string = '';
  pendingRequestsCount: number = 5;
  
  // Profile Menu Properties
  showProfileMenu: boolean = false;
  profileMenuTop: number = 0;
  profileMenuRight: number = 0;
  userName: string = 'John Doe';
  userEmail: string = 'john.doe@example.com';

  // Change Password Properties
  showChangePasswordDialog: boolean = false;
  passwordForm: FormGroup;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Notification Properties
  showNotifications: boolean = false;
  notificationsMenuTop: number = 0;
  notificationsMenuRight: number = 0;
  notifications: Notification[] = [];
  unreadNotifications: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    // Load sample notifications
    this.loadNotifications();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const profileMenu = document.querySelector('.profile-menu');
    const profileButton = document.querySelector('.user-profile');
    const notificationsMenu = document.querySelector('.notifications-menu');
    const notificationsButton = document.querySelector('.notifications');
    
    if (!profileMenu?.contains(event.target as Node) && 
        !profileButton?.contains(event.target as Node)) {
      this.showProfileMenu = false;
    }

    if (!notificationsMenu?.contains(event.target as Node) && 
        !notificationsButton?.contains(event.target as Node)) {
      this.showNotifications = false;
    }
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    this.profileMenuTop = rect.bottom + 10;
    this.profileMenuRight = window.innerWidth - rect.right;
    this.showProfileMenu = !this.showProfileMenu;
  }

  getUserInitials(): string {
    return this.userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  editProfile() {
    // Implement edit profile logic
    console.log('Edit Profile clicked');
    this.showProfileMenu = false;
  }

  changePassword() {
    this.showProfileMenu = false;
    this.showChangePasswordDialog = true;
    this.passwordForm.reset();
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      // Implement password update logic
      console.log('Password update:', this.passwordForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password has been updated successfully'
      });
      this.showChangePasswordDialog = false;
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  loadNotifications() {
    // Simulate API call
    this.notifications = [
      {
        id: 1,
        type: 'travel_request',
        title: 'New Travel Request',
        description: 'John Doe has submitted a travel request to New York.',
        time: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'travel_approved',
        title: 'Travel Request Approved',
        description: 'Your travel request to London has been approved.',
        time: new Date(Date.now() - 3600000), // 1 hour ago
        read: false
      },
      {
        id: 3,
        type: 'reimbursement_request',
        title: 'New Reimbursement Request',
        description: 'Jane Smith has submitted a reimbursement request.',
        time: new Date(Date.now() - 7200000), // 2 hours ago
        read: true
      }
    ];
    this.updateUnreadCount();
  }

  toggleNotifications(event: MouseEvent) {
    event.stopPropagation();
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    this.notificationsMenuTop = rect.bottom + 10;
    this.notificationsMenuRight = window.innerWidth - rect.right - 100;
    this.showNotifications = !this.showNotifications;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'travel_request':
        return 'pi-plane';
      case 'travel_approved':
        return 'pi-check-circle';
      case 'reimbursement_request':
        return 'pi-dollar';
      case 'reimbursement_approved':
        return 'pi-check-square';
      default:
        return 'pi-info-circle';
    }
  }

  handleNotification(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      this.updateUnreadCount();
    }

    // Handle notification click based on type
    switch (notification.type) {
      case 'travel_request':
        this.router.navigate(['/dashboard/requests']);
        break;
      case 'reimbursement_request':
        this.router.navigate(['/finance']);
        break;
      // Add more cases as needed
    }

    this.showNotifications = false;
  }

  clearAllNotifications() {
    this.notifications = [];
    this.unreadNotifications = 0;
    this.showNotifications = false;
  }

  private updateUnreadCount() {
    this.unreadNotifications = this.notifications.filter(n => !n.read).length;
  }

  ngOnInit() {
    // Initialization logic if needed
  }
} 