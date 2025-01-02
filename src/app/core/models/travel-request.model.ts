export interface TravelRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  company: string;
  designation: string;
  dateFrom: string;
  dateTo: string;
  reason: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  approver: string;
  country: string;
  passportStatus: string;
  visaStatus: string;
  createdAt: string;
} 