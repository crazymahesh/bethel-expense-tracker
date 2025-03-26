import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = environment.apiUrl + '/expenses';

  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor() {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  addExpense(expense: any): Observable<any> {
    //return this.http.post(this.apiUrl, expense, { headers: this.getHeaders() });
    return this.http.post(this.apiUrl, expense);
  }

  getExpenses(params: any): Observable<any> {
    //return this.http.get(this.apiUrl, { headers: this.getHeaders(), params });
    return this.http.get(this.apiUrl);
  }

  getExpense(id: string): Observable<any> {
    // return this.http.get(`${this.apiUrl}/${id}`, {
    //   headers: this.getHeaders(),
    // });
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateExpense(id: string, expense: any): Observable<any> {
    // return this.http.put(`${this.apiUrl}/${id}`, expense, {
    //   headers: this.getHeaders(),
    // });
    return this.http.put(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/${id}`, {
    //   headers: this.getHeaders(),
    // });
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
