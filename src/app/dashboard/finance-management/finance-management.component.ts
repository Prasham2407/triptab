import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Expense {
  id: number;
  employeeId: string;
  employeeName: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description?: string;
}

interface Filters {
  searchTerm: string;
  dateRange: Date[];
  status: string;
  category: string;
}

interface BudgetAllocation {
  id: number;
  departmentName: string;
  manager: string;
  type: string;
  period: string;
  allocated: number;
  utilized: number;
  notes?: string;
}

interface ReimbursementItem {
  description: string;
  date: string;
  category: string;
  amount: number;
  receiptUrl?: string;
}

interface Reimbursement {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  requestDate: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
  paymentMethod?: string;
  items: ReimbursementItem[];
}

@Component({
  selector: 'app-finance-management',
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.scss'],
  providers: [MessageService]
})
export class FinanceManagementComponent implements OnInit {
  activeTab: string = 'expenses';
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  loading: boolean = false;
  sortField: string = '';
  sortOrder: number = 1;

  filters: Filters = {
    searchTerm: '',
    dateRange: [],
    status: '',
    category: ''
  };

  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  categoryOptions = [
    { label: 'All', value: '' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Accommodation', value: 'Accommodation' },
    { label: 'Meals', value: 'Meals' },
    { label: 'Others', value: 'Others' }
  ];

  // Budget Management Properties
  totalBudget: number = 1000000;
  allocatedBudget: number = 750000;
  utilizedBudget: number = 450000;
  showBudgetDialog: boolean = false;
  isEditingBudget: boolean = false;
  budgetForm: FormGroup;
  selectedDepartment: string = '';
  selectedYear: number = 2024;

  departmentOptions = [
    { label: 'All Departments', value: '' },
    { label: 'Engineering', value: 'ENG' },
    { label: 'Sales', value: 'SALES' },
    { label: 'Marketing', value: 'MKT' },
    { label: 'Human Resources', value: 'HR' }
  ];

  yearOptions = [
    { label: '2024', value: 2024 },
    { label: '2023', value: 2023 }
  ];

  budgetTypeOptions = [
    { label: 'Annual', value: 'ANNUAL' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Monthly', value: 'MONTHLY' }
  ];

  budgetAllocations: BudgetAllocation[] = [
    {
      id: 1,
      departmentName: 'Engineering',
      manager: 'John Doe',
      type: 'Annual',
      period: '2024',
      allocated: 300000,
      utilized: 150000
    },
    // Add more sample data
  ];

  departmentBudgetData = {
    labels: ['Engineering', 'Sales', 'Marketing', 'HR'],
    datasets: [
      {
        data: [300000, 200000, 150000, 100000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  monthlyUtilizationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Budget',
        data: [65000, 59000, 80000, 81000, 56000, 55000],
        backgroundColor: '#42A5F5'
      },
      {
        label: 'Utilized',
        data: [45000, 52000, 70000, 60000, 45000, 48000],
        backgroundColor: '#66BB6A'
      }
    ]
  };

  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  barChartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Reimbursement Properties
  reimbursements: Reimbursement[] = [];
  filteredReimbursements: Reimbursement[] = [];
  showReimbursementDetails: boolean = false;
  selectedReimbursement: Reimbursement | null = null;
  approvalComments: string = '';
  selectedPaymentMethod: string = '';

  reimbursementFilters = {
    searchTerm: '',
    dateRange: [],
    status: ''
  };

  reimbursementStatusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Paid', value: 'Paid' }
  ];

  paymentMethods = [
    { label: 'Direct Deposit', value: 'DIRECT_DEPOSIT' },
    { label: 'Check', value: 'CHECK' },
    { label: 'Wire Transfer', value: 'WIRE' }
  ];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.budgetForm = this.fb.group({
      department: ['', Validators.required],
      type: ['', Validators.required],
      period: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
    this.loadReimbursements();
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.expenses = [
        {
          id: 1,
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          date: '2024-03-15',
          category: 'Travel',
          amount: 500,
          currency: 'USD',
          status: 'Pending',
          description: 'Flight tickets for client meeting'
        },
        // Add more sample data
      ];
      this.filteredExpenses = [...this.expenses];
      this.loading = false;
    }, 1000);
  }

  applyFilters() {
    this.filteredExpenses = this.expenses.filter(expense => {
      let matches = true;

      // Search term filter
      if (this.filters.searchTerm) {
        const searchTerm = this.filters.searchTerm.toLowerCase();
        matches = matches && (
          expense.employeeName.toLowerCase().includes(searchTerm) ||
          expense.employeeId.toLowerCase().includes(searchTerm) ||
          expense.description?.toLowerCase().includes(searchTerm)
        );
      }

      // Status filter
      if (this.filters.status) {
        matches = matches && expense.status === this.filters.status;
      }

      // Category filter
      if (this.filters.category) {
        matches = matches && expense.category === this.filters.category;
      }

      // Date range filter
      if (this.filters.dateRange?.length === 2) {
        const expenseDate = new Date(expense.date);
        matches = matches && (
          expenseDate >= this.filters.dateRange[0] &&
          expenseDate <= this.filters.dateRange[1]
        );
      }

      return matches;
    });
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

  viewExpenseDetails(expense: Expense) {
    // Implement view details logic
    console.log('Viewing expense:', expense);
  }

  approveExpense(expense: Expense) {
    expense.status = 'Approved';
    this.messageService.add({
      severity: 'success',
      summary: 'Expense Approved',
      detail: `Expense for ${expense.employeeName} has been approved.`
    });
  }

  rejectExpense(expense: Expense) {
    expense.status = 'Rejected';
    this.messageService.add({
      severity: 'error',
      summary: 'Expense Rejected',
      detail: `Expense for ${expense.employeeName} has been rejected.`
    });
  }

  exportToExcel() {
    // Implement export logic
    console.log('Exporting to Excel...');
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getAllocationPercentage(): number {
    return Math.round((this.allocatedBudget / this.totalBudget) * 100);
  }

  getUtilizationPercentage(): number {
    return Math.round((this.utilizedBudget / this.allocatedBudget) * 100);
  }

  getBudgetStatus(budget: BudgetAllocation): string {
    const utilizationPercentage = (budget.utilized / budget.allocated) * 100;
    if (utilizationPercentage >= 90) return 'Critical';
    if (utilizationPercentage >= 75) return 'Warning';
    return 'Good';
  }

  getBudgetStatusSeverity(budget: BudgetAllocation): string {
    const status = this.getBudgetStatus(budget);
    switch (status) {
      case 'Critical': return 'danger';
      case 'Warning': return 'warning';
      default: return 'success';
    }
  }

  showNewBudgetDialog() {
    this.isEditingBudget = false;
    this.budgetForm.reset();
    this.showBudgetDialog = true;
  }

  editBudget(budget: BudgetAllocation) {
    this.isEditingBudget = true;
    this.budgetForm.patchValue({
      department: budget.departmentName,
      type: budget.type,
      period: new Date(budget.period),
      amount: budget.allocated
    });
    this.showBudgetDialog = true;
  }

  saveBudget() {
    if (this.budgetForm.valid) {
      // Implement save logic
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Budget has been saved successfully'
      });
      this.showBudgetDialog = false;
    }
  }

  filterBudgets() {
    // Implement filtering logic
    console.log('Filtering budgets...');
  }

  viewBudgetDetails(budget: BudgetAllocation) {
    // Implement view details logic
    console.log('Viewing budget details:', budget);
  }

  loadReimbursements() {
    // Simulate API call
    this.loading = true;
    setTimeout(() => {
      this.reimbursements = [
        {
          id: 1,
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          department: 'Engineering',
          requestDate: '2024-03-15',
          amount: 1250.50,
          status: 'Pending',
          items: [
            {
              description: 'Flight Ticket',
              date: '2024-03-10',
              category: 'Travel',
              amount: 850.00
            },
            {
              description: 'Hotel Stay',
              date: '2024-03-11',
              category: 'Accommodation',
              amount: 400.50
            }
          ]
        },
        // Add more sample data
      ];
      this.filteredReimbursements = [...this.reimbursements];
      this.loading = false;
    }, 1000);
  }

  filterReimbursements() {
    this.filteredReimbursements = this.reimbursements.filter(reimbursement => {
      let matches = true;

      if (this.reimbursementFilters.searchTerm) {
        const searchTerm = this.reimbursementFilters.searchTerm.toLowerCase();
        matches = matches && (
          reimbursement.employeeName.toLowerCase().includes(searchTerm) ||
          reimbursement.employeeId.toLowerCase().includes(searchTerm)
        );
      }

      if (this.reimbursementFilters.status) {
        matches = matches && reimbursement.status === this.reimbursementFilters.status;
      }

      if (this.reimbursementFilters.dateRange?.length === 2) {
        const requestDate = new Date(reimbursement.requestDate);
        matches = matches && (
          requestDate >= this.reimbursementFilters.dateRange[0] &&
          requestDate <= this.reimbursementFilters.dateRange[1]
        );
      }

      return matches;
    });
  }

  getReimbursementStatusSeverity(status: string): string {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      case 'Paid': return 'info';
      default: return 'info';
    }
  }

  viewReimbursementDetails(reimbursement: Reimbursement) {
    this.selectedReimbursement = reimbursement;
    this.approvalComments = '';
    this.selectedPaymentMethod = '';
    this.showReimbursementDetails = true;
  }

  viewReceipt(item: ReimbursementItem) {
    // Implement receipt viewing logic
    console.log('Viewing receipt for:', item);
  }

  approveWithComments() {
    if (this.selectedReimbursement) {
      this.selectedReimbursement.status = 'Approved';
      this.messageService.add({
        severity: 'success',
        summary: 'Reimbursement Approved',
        detail: 'The reimbursement request has been approved.'
      });
      this.showReimbursementDetails = false;
    }
  }

  rejectWithComments() {
    if (this.selectedReimbursement) {
      this.selectedReimbursement.status = 'Rejected';
      this.messageService.add({
        severity: 'error',
        summary: 'Reimbursement Rejected',
        detail: 'The reimbursement request has been rejected.'
      });
      this.showReimbursementDetails = false;
    }
  }

  processPayment() {
    if (this.selectedReimbursement && this.selectedPaymentMethod) {
      this.selectedReimbursement.status = 'Paid';
      this.selectedReimbursement.paymentMethod = this.selectedPaymentMethod;
      this.messageService.add({
        severity: 'success',
        summary: 'Payment Processed',
        detail: `Payment has been processed via ${this.selectedPaymentMethod}.`
      });
      this.showReimbursementDetails = false;
    }
  }

  exportReimbursements() {
    // Implement export logic
    console.log('Exporting reimbursements...');
  }
} 