import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../core/services/expense.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-add-expense',
    imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
    templateUrl: './add-expense.component.html',
    styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup = new FormGroup({});
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
  error$ = new BehaviorSubject<string>('');

  expenseService = inject(ExpenseService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
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

  reset(){
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
    if (this.expenseForm.invalid) {
      return;
    }
    const expense = {
      overallMaintenance: this.expenseForm.value.overallMaintenance,
      totalExpenseAmount: 0,
      securitySalary: this.expenseForm.value.securitySalary,
      securityAdvance: this.expenseForm.value.securityAdvance,
      commonEB: this.expenseForm.value.commonEB,
      cleaningAccessories: this.expenseForm.value.cleaningAccessories,
      garbageMan: this.expenseForm.value.garbageMan,
      dieselGenset: this.expenseForm.value.dieselGenset,
      cctvRecharge: this.expenseForm.value.cctvRecharge,
      month: this.expenseForm.value.month,
      createdDate: new Date(this.expenseForm.value.createdDate).toISOString(),
    };
    this.expenseService.addExpense(expense).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error$.next(err?.error?.message || 'An error occurred');
      },
    });
  }
}
