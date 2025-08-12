import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  verifyLogin(email: string, password: string ): Observable<any> {
    const apiUrl="http://127.0.0.1:8000/users/token"
    const data={
      email:email,
      password: password
    }
    return this.http.post(apiUrl, data);
  }

  createAccount(firstName: string, lastName: string, email: string, password: string) {
    const apiUrl="http://127.0.0.1:8000/users/createuser"
    const data={
      first_name: firstName,
      last_name: lastName,
      email:email,
      password: password,
    }
    return this.http.post(apiUrl, data)
  }
}
