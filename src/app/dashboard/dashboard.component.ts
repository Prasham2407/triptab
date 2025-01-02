import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelRequest } from '../core/models/travel-request.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserCard {
  id: number;
  name: string;
  designation: string;
  place: string;
  time: string;
  avatar: string;
  company?: string;
  emailOfficial?: string;
  emailPersonal?: string;
  country?: string;
  passportStatus?: string;
  visaStatus?: string;
  age?: number;
  gender?: string;
  reasonForVisit?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: UserCard[] = [];
  showUserDetail: boolean = false;
  selectedUser: UserCard | null = null;
  activeView: 'dashboard' | 'requests' = 'dashboard';
  showNewRequest = false;
  requestForm: FormGroup;
  url:string = "http://192.168.20.227:14011";
  
  travelRequests: TravelRequest[] = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      company: 'Tech Corp',
      designation: 'Senior Developer',
      dateFrom: '2024-04-01',
      dateTo: '2024-04-15',
      reason: 'Client Meeting',
      approvalStatus: 'Pending',
      approver: 'Jane Manager',
      country: 'USA',
      passportStatus: 'Valid',
      visaStatus: 'In Process',
      createdAt: '2024-03-15'
    }
    // Add more sample data
  ];

  countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    // Add more countries
  ];

  documentStatuses = [
    'Valid',
    'In Process',
    'Not Applied',
    'Expired'
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.requestForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      company: ['', Validators.required],
      designation: ['', Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      reason: ['', Validators.required],
      country: ['', Validators.required],
      passportStatus: ['', Validators.required],
      visaStatus: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.users = []

    // Set active view based on route data
    this.route.data.subscribe(data => {
      if (data['view']) {
        this.activeView = data['view'];
      }
    });

    
    let params = {};
    params['skip'] = 0;
    params['limit'] = 100;
    this.http.get(`${this.url}/travel/travel_request`, params).subscribe((res: any) => {
    console.log(res);
    if(res.status == "success"){
        this.users = res.data;
        this.users.forEach((user,index)=>{
            user.avatar = `assets/avatar${index+1}.jpg`;
        })
    }
  });
  }

  onUserCardClick(user: UserCard) {
    this.selectedUser = user;
    this.showUserDetail = true;
  }

  logout() {
    this.authService.logout();
  }

  setActiveView(view: 'dashboard' | 'requests') {
    this.activeView = view;
  }

  showNewRequestDialog() {
    this.showNewRequest = true;
    this.requestForm.reset();
  }

  submitRequest() {
    if (this.requestForm.valid) {
      const newRequest: TravelRequest = {
        id: this.travelRequests.length + 1,
        ...this.requestForm.value,
        approvalStatus: 'Pending',
        approver: 'TBD',
        createdAt: new Date().toISOString()
      };
      
      this.travelRequests.unshift(newRequest);
      this.showNewRequest = false;
    }
  }

  viewRequest(request: TravelRequest) {
    // Implement view logic
    console.log('Viewing request:', request);
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'info';
    }
  }
} 