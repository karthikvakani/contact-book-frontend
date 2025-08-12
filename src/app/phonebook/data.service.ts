import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = ""

  constructor(private Http: HttpClient) { }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token')
    const apiUrl = "http://127.0.0.1:8000/users/getuser"
    return this.Http.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getUserContacts(search: string, page: number=1, type: string = ""): Observable<any> {
    const token = localStorage.getItem('token')
    
    if (type === "fav") {
      this.apiUrl = `http://127.0.0.1:8000/contact/getallcontacts?search=${search}&page=${page}&type=favourites`
    } else if (type === "group") {
      this.apiUrl = `http://127.0.0.1:8000/contact/getallcontacts?search=${search}&page=${page}&type=grouped`
    } else {
      this.apiUrl = `http://127.0.0.1:8000/contact/getallcontacts?search=${search}&page=${page}`
    }

    return this.Http.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createContact(body: any): Observable<any> {
    const token = localStorage.getItem('token')
    const apiUrl = "http://127.0.0.1:8000/contact/createcontact"
    return this.Http.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  editContact(body: any): Observable<any> {
    const token = localStorage.getItem('token')
    const apiUrl = `http://127.0.0.1:8000/contact/editcontact`
    return this.Http.put(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteContact(id: number): Observable<any> {
    const token = localStorage.getItem('token')
    const apiUrl = `http://127.0.0.1:8000/contact/deletecontact?id=${id}`
    return this.Http.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
