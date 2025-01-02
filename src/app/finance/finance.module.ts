import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

// Components
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { ReimbursementsComponent } from './reimbursements/reimbursements.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';

@NgModule({
  declarations: [
    FinanceDashboardComponent,
    ExpenseManagementComponent,
    BudgetManagementComponent,
    ReimbursementsComponent,
    FinancialReportsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FinanceDashboardComponent,
        children: [
          { path: 'expenses', component: ExpenseManagementComponent },
          { path: 'budgets', component: BudgetManagementComponent },
          { path: 'reimbursements', component: ReimbursementsComponent },
          { path: 'reports', component: FinancialReportsComponent },
          { path: '', redirectTo: 'expenses', pathMatch: 'full' }
        ]
      }
    ]),
    TableModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    ChartModule,
    FileUploadModule,
    TooltipModule,
    DialogModule
  ]
})
export class FinanceModule { } 