import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";
import { DatePipe, NgClass } from '@angular/common';
import { Expense } from '../../core/models/expense.model';
import { Subject, takeUntil } from 'rxjs';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-list-expenses',
  imports: [ReactiveFormsModule, NgApexchartsModule],
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.scss',
})

export class ListExpensesComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  filterForm: FormGroup;
  expenses = signal<Expense[]>([]);
  filter = signal<string>('');
  startDate = signal<string>('');
  endDate = signal<string>('');
  error = signal<string>('');
  errorMsg = signal<string>('');
  showConfirmDialog = signal<boolean>(false);
  selectedExpenseId = signal<string>('');
  isLoading = signal<boolean>(false);
  minDate = signal<string>('');
  totalAmount = signal<number>(0);
  currentMonthTotal: number = 0;
  averagePerDay: number = 0;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private readonly DATE_FORMAT = 'T00:00:00.000Z';
  private readonly END_DATE_FORMAT = 'T23:59:59.999Z';

  expenseService = inject(ExpenseService);
  router = inject(Router);
  fb = inject(FormBuilder);
  months: string[] = ['Jan-2024', 'Feb-2024', 'Mar-2024', 'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024', 'Oct-2024', 'Nov-2024', 'Dec-2024', 'Jan-2025', 'Feb-2025', 'Mar-2025', 'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026', 'Jul-2026', 'Aug-2026', 'Sep-2026', 'Oct-2026', 'Nov-2026', 'Dec-2026', 'Jan-2027', 'Feb-2027', 'Mar-2027', 'Apr-2027', 'May-2027', 'Jun-2027', 'Jul-2027', 'Aug-2027', 'Sep-2027', 'Oct-2027', 'Nov-2027', 'Dec-2027', 'Jan-2028', 'Feb-2028', 'Mar-2028', 'Apr-2028', 'May-2028', 'Jun-2028', 'Jul-2028', 'Aug-2028', 'Sep-2028', 'Oct-2028', 'Nov-2028', 'Dec-2028']
  currentMonthExpenses = {
    overallMaintenance: 0,
    totalExpenseAmount:0,
    balanceAmount: 0,
    securitySalary: 0,
    securityAdvance: 0,
    commonEB: 0,
    cleaningAccessories: 0,
    garbageMan: 0,
    dieselGenset: 0,
    cctvRecharge: 0
  }
  constructor() {

    this.chartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };

    this.filterForm = this.fb.group({
      filter: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });

    

  }

  ngOnInit() {
    this.getExpenses();
  }
  getCurrentMonthYear(): string {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get current month name
    const year = date.getFullYear(); // Get current year

    return `${month}-${year}`; // Format: 'Mar-2024'
  }
  getExpenses(params: any = {}) {
    this.isLoading.set(true);
    this.expenseService
      .getExpenses(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.expenses.set(res.expenses);
          //this.totalAmount.set(res.totalAmount);
          
          // Calculate current month total
          console.log(this.getCurrentMonthYear());
          let filterByMonth = res.expenses.filter((expense:any) => {
            return (expense.month === this.getCurrentMonthYear())
          })
          this.currentMonthExpenses = {...filterByMonth};
          console.log(this.currentMonthExpenses);
          
          // this.currentMonthTotal = res.expenses
          //   .filter((expense: Expense) => {
          //     const expenseDate = new Date(expense.createdDate);
          //     return expenseDate.getMonth() === currentMonth && 
          //            expenseDate.getFullYear() === currentYear;
          //   })
          //   .reduce((total: number, expense: Expense) => total + expense.securitySalary + expense.securityAdvance + expense.commonEB + expense.cleaningAccessories + expense.garbageMan + expense.dieselGenset + expense.cctvRecharge, 0);

          // Calculate average per day
          // if (res.expenses.length > 0) {
          //   const oldestExpense = new Date(Math.min(...res.expenses.map((e: Expense) => new Date(e.createdDate).getTime())));
          //   const daysDiff = Math.ceil((now.getTime() - oldestExpense.getTime()) / (1000 * 60 * 60 * 24));
          //   this.averagePerDay = Math.round((res.totalAmount / (daysDiff || 1)) * 100) / 100;
          // } else {
          //   this.averagePerDay = 0;
          // }

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
          this.errorMsg.set(err?.error?.message || 'An error occurred');
        },
      });
  }

  onFilterChange() {
    const filterValue = this.filterForm.get('filter')?.value;
    this.filter.set(filterValue);
    const params: any = {};

    switch (filterValue) {
      case 'week':
        this.setParams(params, 7, 'week');
        break;
      case 'month':
        this.setParams(params, 30, 'month');
        break;
      case '3months':
        this.setParams(params, 90, '3months');
        break;
      case '6months':
        this.setParams(params, 180, '6months');
        break;
      case 'custom':
        this.resetCustomFilter();
        return;
      default:
        this.getExpenses();
        return;
    }
    this.getExpenses(params);
  }

  private setParams(params: any, days: number, period: string) {
    params.startDate = this.getPastDate(days) + this.DATE_FORMAT;
    params.endDate =
      new Date().toISOString().split('T')[0] + this.END_DATE_FORMAT;
    params.period = period;
  }

  applyCustomFilter() {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    if (startDate && endDate) {
      const params = {
        startDate: new Date(startDate).toISOString(),
        endDate:
          new Date(endDate).toISOString().split('T')[0] + this.END_DATE_FORMAT,
        period: 'custom',
      };
      this.getExpenses(params);
    }
  }

  resetCustomFilter() {
    this.filterForm.get('startDate')?.reset();
    this.filterForm.get('endDate')?.reset();
    this.expenses.set([]);
    this.totalAmount.set(0);
  }

  onStartDateChange() {
    this.minDate.set(this.filterForm.get('startDate')?.value);
  }

  getPastDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  editExpense(expense: any) {
    this.router.navigate(['/edit-expense', expense._id]);
  }

  showDeleteConfirm(expenseId: string) {
    this.selectedExpenseId.set(expenseId);
    this.showConfirmDialog.set(true);
  }

  deleteExpense(id: string) {
    this.expenseService
      .deleteExpense(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.getExpenses();
          this.showConfirmDialog.set(false);
        },
        error: (err) => {
          console.error(err);
          this.error.set(err?.error?.message || 'An error occurred');
        },
      });
  }

  getCategoryClass(category: string): string {
    const classes: { [key: string]: string } = {
      Groceries: 'bg-green-100 text-green-800',
      Leisure: 'bg-blue-100 text-blue-800',
      Electronics: 'bg-yellow-100 text-yellow-800',
      Utilities: 'bg-red-100 text-red-800',
      Clothing: 'bg-purple-100 text-purple-800',
      Health: 'bg-pink-100 text-pink-800',
      Others: 'bg-gray-100 text-gray-800'
    };
    return classes[category] || 'bg-gray-100 text-gray-800';
  }
}
