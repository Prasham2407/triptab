import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-dashboard',
  template: `
    <div class="finance-dashboard">
      <div class="dashboard-header">
        <h2>Finance Management</h2>
      </div>
      
      <div class="dashboard-nav">
        <ul>
          <li routerLink="expenses" routerLinkActive="active">
            <i class="pi pi-file"></i>
            Expense Management
          </li>
          <li routerLink="budgets" routerLinkActive="active">
            <i class="pi pi-wallet"></i>
            Budget Management
          </li>
          <li routerLink="reimbursements" routerLinkActive="active">
            <i class="pi pi-dollar"></i>
            Reimbursements
          </li>
          <li routerLink="reports" routerLinkActive="active">
            <i class="pi pi-chart-bar"></i>
            Financial Reports
          </li>
        </ul>
      </div>

      <div class="dashboard-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .finance-dashboard {
      padding: 2rem;
      
      .dashboard-header {
        margin-bottom: 2rem;
        
        h2 {
          margin: 0;
          color: var(--text-color);
        }
      }

      .dashboard-nav {
        margin-bottom: 2rem;
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 1rem;
          
          li {
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-color-secondary);
            transition: all 0.2s;
            
            i {
              font-size: 1.25rem;
            }
            
            &:hover {
              background: var(--surface-hover);
            }
            
            &.active {
              background: var(--primary-color);
              color: white;
            }
          }
        }
      }
    }
  `]
})
export class FinanceDashboardComponent implements OnInit {
  ngOnInit() {}
} 