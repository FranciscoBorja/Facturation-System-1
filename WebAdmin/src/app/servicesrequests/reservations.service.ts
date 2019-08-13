import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AutenticateService} from "./autenticate.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient, private authservices: AutenticateService) {
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: 'Bearer ' + this.authservices.getToken()
  });

  getReservations() {
    const url_api = "http://localhost:3001/server/reservations/getReservas"
    return this.http.get(url_api, {headers: this.headers}).pipe(map(data => data))
  }

  getAllNotifications() {
    const url_api = "http://localhost:3001/server/reservations/getAllNotifications"
    return this.http.get(url_api, {headers: this.headers}).pipe(map(data => data))
  }

  updateNotification(state: string, id: number) {
    const url_api = "http://localhost:3001/server/reservations/updateNotification"
    return this.http.post(url_api, {
      params: {
        state: state,
        id: id
      }
    }, {headers: this.headers}).pipe(map(data => data))


  }

}
