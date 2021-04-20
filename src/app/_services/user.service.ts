import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount } from '../model/BankAccount.model';
import { DepositWithdra } from '../model/DepositWithdra.model';
import { EmailPayload } from '../model/EmailPayload.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

const API_URL = baseUrl+'/bankAccount/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAccountInfo(accountNumber:string): Observable<any> {
    return this.http.get(API_URL + 'get/' +accountNumber);
  }

  getAccountInfoByEmail(email:EmailPayload): Observable<any> {
    return this.http.post(API_URL + 'getByEmail',
    JSON.stringify(email),
    httpOptions);
  }

  createAccount(account:BankAccount): Observable<any>{
    return this.http.post(API_URL + 'create', {
      account
    }, httpOptions);
  }

  deposit(account:DepositWithdra): Observable<any>{
    return this.http.post(API_URL + 'deposit', 
    JSON.stringify(account),
    httpOptions);
  }

  withdrawal(account:DepositWithdra): Observable<any>{
    return this.http.post(API_URL + 'withdrawal', 
      JSON.stringify(account),
      httpOptions);
  }
}
