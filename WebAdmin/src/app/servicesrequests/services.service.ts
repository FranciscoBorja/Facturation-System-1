import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AutenticateService} from "./autenticate.service";


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient, private authService: AutenticateService) {
  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getServices() {
    const url_api = 'http://localhost:3001/server/services/get'
    return this.http.get(url_api, {headers: this.headers}).pipe(map(data => data))
  }

  registerServices(name: string, description: string) {
    const url_api = "http://localhost:3001/server/services/registerImage"
    return this.http.post(url_api, {
      params: {
        name: name,
        description: description,
      }
    }, {
      headers: this.headers
    }).pipe(map(data => data))

  }

  registerSubServices(name: string, duration: number, price: number, service_id: number) {
    const url_api = 'http://localhost:3001/server/services/registerSubServices';
    return this.http.post(url_api, {
      params: {
        name: name,
        duration: duration,
        price: price,
        service_id: service_id
      }
    }, {
      headers: this.headers
    }).pipe(map(data => data))
  }

  updateSubServices(name: string, duration: number, price: number, service_id: number, id: number) {
    const url_api = 'http://localhost:3001/server/services/updateSubServices';
    return this.http.post(url_api, {
      params: {
        name: name,
        duration: duration,
        price: price,
        service_id: service_id,
        id: id
      }
    }, {
      headers: this.headers

    })
  }
  getSubServicesById(id: number) {
    const url_api = 'http://localhost:3001/server/services/get_sub_services';
    return this.http.post(url_api, {
      id
    }, {headers: this.headers}).pipe(map(data => data))
  }

  getAllSubServices(id: number) {
    const url_api = 'http://localhost:3001/server/services/get_all_sub_services';
    return this.http.post(url_api, {
      id
    }, {headers: this.headers}).pipe(map(data => data))
  }

}
