import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

interface TravelInfo {
  from: string;
  to: string;
  date: string;
  mode: string;
  bookingRef: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
  terminal?: string;
  gate?: string;
  seat?: string;
  class: string;
  carrier: string;
  duration: string;
}

interface Document {
  type: string;
  name: string;
  status: string;
  uploadDate: string;
  fileUrl: string;
}

interface FinanceDetail {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

interface Accommodation {
  hotelName: string;
  location: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  bookingRef: string;
  status: string;
  amenities: string[];
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  @Input() user: any = null;
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();

  activeTab: number = 0;

  travelInfo: TravelInfo[] = [
    {
      from: 'New York',
      to: 'London',
      date: '2024-03-15',
      mode: 'Flight',
      bookingRef: 'FL123456',
      status: 'Confirmed',
      departureTime: '10:30 AM',
      arrivalTime: '10:45 PM',
      terminal: 'T5',
      gate: 'G12',
      seat: '12A',
      class: 'Business',
      carrier: 'British Airways',
      duration: '7h 15m'
    },
    {
      from: 'London',
      to: 'Paris',
      date: '2024-03-20',
      mode: 'Train',
      bookingRef: 'TR789012',
      status: 'Confirmed',
      departureTime: '09:15 AM',
      arrivalTime: '12:30 PM',
      terminal: 'St Pancras',
      seat: 'Coach 7, Seat 23',
      class: 'First Class',
      carrier: 'Eurostar',
      duration: '3h 15m'
    }
  ];

  documents: Document[] = [
    {
      type: 'Identity',
      name: 'Aadhar Card',
      status: 'Verified',
      uploadDate: '2024-01-15',
      fileUrl: 'path/to/aadhar.pdf'
    },
    {
      type: 'Address',
      name: 'Utility Bill',
      status: 'Pending',
      uploadDate: '2024-02-01',
      fileUrl: 'path/to/bill.pdf'
    }
  ];

  financeDetails: FinanceDetail[] = [
    {
      category: 'Travel',
      allocated: 5000,
      spent: 3500,
      remaining: 1500
    },
    {
      category: 'Accommodation',
      allocated: 3000,
      spent: 2000,
      remaining: 1000
    },
    {
      category: 'Food & Beverages',
      allocated: 1000,
      spent: 600,
      remaining: 400
    }
  ];

  accommodations: Accommodation[] = [
    {
      hotelName: 'The Ritz London',
      location: 'London, UK',
      address: '150 Piccadilly, St. James\'s, London W1J 9BR, United Kingdom',
      checkIn: '2024-03-15',
      checkOut: '2024-03-20',
      roomType: 'Deluxe Suite',
      bookingRef: 'BK123456',
      status: 'Confirmed',
      amenities: ['Free WiFi', 'Breakfast Included', 'Airport Shuttle', 'Spa Access']
    },
    {
      hotelName: 'Four Seasons Paris',
      location: 'Paris, France',
      address: '31 Avenue George V, 75008 Paris, France',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      roomType: 'Executive Room',
      bookingRef: 'BK789012',
      status: 'Confirmed',
      amenities: ['Free WiFi', 'Room Service', 'City View', 'Gym Access']
    }
  ];

  // Chart Data
  expenseChartData: ChartData = {
    labels: ['Travel', 'Accommodation', 'Food', 'Others'],
    datasets: [{
      data: [45, 30, 15, 10],
      backgroundColor: ['#4b6cb7', '#182848', '#1e88e5', '#7986cb']
    }]
  };

  spendingTrendData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Spending',
      data: [2100, 3200, 2800, 4100, 2900, 3600],
      borderColor: '#4b6cb7',
      tension: 0.4
    }]
  };

  budgetChartData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Allocated',
        data: [15000, 12000, 18000, 14000],
        backgroundColor: '#4b6cb7'
      },
      {
        label: 'Spent',
        data: [12000, 8000, 15000, 9000],
        backgroundColor: '#182848'
      }
    ]
  };

  travelModeData: ChartData = {
    labels: ['Flight', 'Train', 'Car', 'Bus'],
    datasets: [{
      data: [60, 25, 10, 5],
      backgroundColor: ['#4b6cb7', '#182848', '#1e88e5', '#7986cb']
    }]
  };

  // Chart Options
  pieChartOptions: ChartOptions = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5
  };

  lineChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5
  };

  barChartOptions: ChartOptions = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5
  };

  doughnutChartOptions: ChartOptions = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5
  };

  selectedLocation: string | null = null;

  selectLocation(location: string): void {
    this.selectedLocation = location;
  }

  getSelectedTravel(): TravelInfo | null {
    return this.travelInfo.find(t => t.to === this.selectedLocation) || null;
  }

  getNextTravel(currentTravel: TravelInfo): TravelInfo | null {
    const currentIndex = this.travelInfo.indexOf(currentTravel);
    return currentIndex < this.travelInfo.length - 1 ? this.travelInfo[currentIndex + 1] : null;
  }

  getStayDuration(startDate: string, endDate: string | undefined): string {
    if (!endDate) return 'Final Destination';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  getTotalBudget(): number {
    return this.financeDetails.reduce((acc, curr) => acc + curr.allocated, 0);
  }

  getTotalSpent(): number {
    return this.financeDetails.reduce((acc, curr) => acc + curr.spent, 0);
  }

  getTotalRemaining(): number {
    return this.financeDetails.reduce((acc, curr) => acc + curr.remaining, 0);
  }

  downloadDocument(doc: Document): void {
    // Implement download logic
    console.log('Downloading:', doc.name);
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Valid':
      case 'Approved':
        return 'success';
      case 'In Process':
        return 'info';
      case 'Renewal Required':
        return 'warning';
      default:
        return 'danger';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Valid':
      case 'Approved':
        return 'pi-check-circle';
      case 'In Process':
        return 'pi-sync';
      case 'Renewal Required':
        return 'pi-exclamation-circle';
      default:
        return 'pi-times-circle';
    }
  }

  getTravelModeIcon(mode: string): string {
    switch (mode.toLowerCase()) {
      case 'flight':
        return 'pi-send';
      case 'train':
        return 'pi-directions-railway';
      case 'bus':
        return 'pi-directions-bus';
      default:
        return 'pi-car';
    }
  }

  getDurationInHours(duration: string): string {
    return duration.replace('h', ' hours ').replace('m', ' minutes');
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Helper method to get accommodation for a travel
  getAccommodationForTravel(travel: TravelInfo): Accommodation | null {
    return this.accommodations.find(acc => 
      acc.checkIn === travel.date || 
      new Date(acc.checkIn) <= new Date(travel.date) && 
      new Date(acc.checkOut) >= new Date(travel.date)
    ) || null;
  }

  ngOnInit() {
    // Auto-select first location
    if (this.travelInfo.length > 0) {
      this.selectedLocation = this.travelInfo[0].to;
    }
  }
}