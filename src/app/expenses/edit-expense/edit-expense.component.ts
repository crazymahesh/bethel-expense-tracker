import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Expense } from '../../core/models/expense.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-edit-expense',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './edit-expense.component.html',
    styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent implements OnInit, OnDestroy {
  expenseForm: FormGroup;
  categories: string[] = [
    'Groceries',
    'Leisure',
    'Electronics',
    'Utilities',
    'Clothing',
    'Health',
    'Others',
  ];
  months: string[] = ['Jan-2024', 'Feb-2024', 'Mar-2024', 'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024', 'Oct-2024', 'Nov-2024', 'Dec-2024', 'Jan-2025', 'Feb-2025', 'Mar-2025', 'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026', 'Jul-2026', 'Aug-2026', 'Sep-2026', 'Oct-2026', 'Nov-2026', 'Dec-2026', 'Jan-2027', 'Feb-2027', 'Mar-2027', 'Apr-2027', 'May-2027', 'Jun-2027', 'Jul-2027', 'Aug-2027', 'Sep-2027', 'Oct-2027', 'Nov-2027', 'Dec-2027', 'Jan-2028', 'Feb-2028', 'Mar-2028', 'Apr-2028', 'May-2028', 'Jun-2028', 'Jul-2028', 'Aug-2028', 'Sep-2028', 'Oct-2028', 'Nov-2028', 'Dec-2028']
  error = signal<string>('');
  expense = signal<Expense>({} as Expense);
  route = inject(ActivatedRoute);
  expenseService = inject(ExpenseService);
  router = inject(Router);
  private unsubscribe$ = new Subject<void>();

  constructor() {
    this.expenseForm = new FormGroup({
      comments: new FormControl('', [
        //Validators.required,
        Validators.minLength(3),
      ]),
      month: new FormControl('', Validators.required),
      overallMaintenance: new FormControl('',),
      securitySalary: new FormControl('', []),
      securityAdvance: new FormControl('', [ Validators.min(0)]),
      commonEB: new FormControl('', [ Validators.min(0)]),
      cleaningAccessories: new FormControl('', [ Validators.min(0)]),
      garbageMan: new FormControl('', [ Validators.min(0)]),
      dieselGenset: new FormControl('', [ Validators.min(0)]),
      cctvRecharge: new FormControl('', [ Validators.min(0)]),
      createdDate: new FormControl(
        new Date().toISOString().split('T')[0],
        Validators.required
      ),
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      {
        next: (res) => {
          this.expense.set(res['expense']);
          this.expenseForm.patchValue({
            comments: this.expense().comments,
            overallMaintenance: this.expense().overallMaintenance,
            securitySalary: this.expense().securitySalary,
            securityAdvance: this.expense().securityAdvance,
            commonEB: this.expense().commonEB,
            cleaningAccessories: this.expense().cleaningAccessories,
            garbageMan: this.expense().garbageMan,
            dieselGenset: this.expense().dieselGenset,
            cctvRecharge: this.expense().cctvRecharge,
            createdDate: this.formatDate(this.expense().createdDate),
          });
        },
        error: (err) => {
          console.error(err);
          this.error.set(err?.error?.message || 'An error occurred');
        },
      }
    );
  }

  get comments() {
    return this.expenseForm.get('comments');
  }

  get overallMaintenance() {
    return this.expenseForm.get('overallMaintenance');
  }

  get securitySalary() {
    return this.expenseForm.get('securitySalary');
  }
  get securityAdvance() {
    return this.expenseForm.get('securityAdvance');
  }
  get commonEB() {
    return this.expenseForm.get('commonEB');
  }
  get cleaningAccessories() {
    return this.expenseForm.get('cleaningAccessories');
  }
  get garbageMan() {
    return this.expenseForm.get('garbageMan');
  }
  get dieselGenset() {
    return this.expenseForm.get('dieselGenset');
  }
  get cctvRecharge() {
    return this.expenseForm.get('cctvRecharge');
  }
  get month() {
    return this.expenseForm.get('month');
  }

  get createdDate() {
    return this.expenseForm.get('createdDate');
  }

  formatDate(date: string): string {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  reset() {
    this.expenseForm.get('comments')?.reset();
    this.expenseForm.get('securityAdvance')?.reset();
    this.expenseForm.get('commonEB')?.reset();
    this.expenseForm.get('cleaningAccessories')?.reset();
    this.expenseForm.get('garbageMan')?.reset();
    this.expenseForm.get('dieselGenset')?.reset();
    this.expenseForm.get('cctvRecharge')?.reset();
    this.expenseForm.get('month')?.reset();
  }

  onSubmit() {
    console.log(this.expenseForm.value);
    //totalExpenseAmount: 0,
    this.expenseService.updateExpense(this.expense()._id, this.expenseForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error.set(err?.error?.message || 'An error occurred');
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
