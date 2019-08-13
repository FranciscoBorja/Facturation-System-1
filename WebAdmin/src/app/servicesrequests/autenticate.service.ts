import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";
import {PersonAdmin} from "../models/person-admin"
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AutenticateService {

  constructor(private http: HttpClient, private router: Router) {
  }

  valueLogOut: boolean

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: 'Bearer ' + this.getToken()
  });

  getEmployee() {
    const url_api = "http://localhost:3001/server/users/getEmployees"
    return this.http.get(url_api, {headers: this.headers}).pipe(map(data => data))
  }

  loginUser(password: string, email: string): Observable<any> {
    const url_api = "http://localhost:3001/server/users/login"
    return this.http.post<PersonAdmin>(url_api, {
      params: {
        email,
        password
      }
    }, {headers: this.headers}).pipe(map(data => data))
  }

  registerUser(first_name: string, last_name: string, birth_date: string, email: string, password: string, gender_id: number, role_id: number) {
    const url_api = "http://localhost:3001/server/users/registerAdmin"
    return this.http.put(url_api, {
      params: {
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
        password: password,
        gender_id: gender_id,

      }, role_id: role_id
    }, {
      headers: this.headers
    }).pipe(map(data => data))

  }

  updateUser(first_name: string, last_name: string, birth_date: string, email: string, password: string, gender_id: number, role_id: number, id: number) {
    const url_api = "http://localhost:3001/server/users/update"
    return this.http.post(url_api, {
      params: {
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
        password: password,
        gender_id: gender_id,

        id: id
      }, role_id: role_id
    }, {
      headers: this.headers
    }).pipe(map(data => data))

  }

  setIdUser(id) {
    let idUsed = id
    localStorage.setItem('idUsedUserAdmin', idUsed)
  }

  getIdUser() {
    return localStorage.getItem('idUsedUser')
  }
  getAllUsers() {
    const url_api = "http://localhost:3001/server/users/getAllUsers"
    return this.http.get(url_api, {headers: this.headers}).pipe(map(data => data))
  }

  setLogInSubbmitted(validate) {
    let logIn = validate
    localStorage.setItem('loginValidate', logIn)
  }

  getValidate() {
    return localStorage.getItem('loginValidate')
  }

  setUser(user: PersonAdmin): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token)
  }

  getToken() {
    return localStorage.getItem('accessToken')
  }

  getCurrentUser(): PersonAdmin {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: PersonAdmin = JSON.parse(user_string);
      return user;
    } else {
      return null
    }
  }

  refresh(): void {
    window.location.reload();
  }

  logoutUser() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem('loginValidate');
    this.router.navigate(['login'])
  }
}
