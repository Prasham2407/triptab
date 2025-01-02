import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const profileMenu = document.querySelector('.profile-menu');
    const profileButton = document.querySelector('.user-profile');
    
    if (!profileMenu?.contains(event.target as Node) && 
        !profileButton?.contains(event.target as Node)) {
      this.showProfileMenu = false;
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

  ngOnInit() {
    // Initialization logic if needed
  }
} 