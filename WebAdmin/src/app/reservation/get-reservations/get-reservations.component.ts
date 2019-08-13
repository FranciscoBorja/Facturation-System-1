import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../models/reservation";
import {AutenticateService} from "../../servicesrequests/autenticate.service";
import {ReservationsService} from "../../servicesrequests/reservations.service";
import {ServicesService} from "../../servicesrequests/services.service";
import {PersonAdmin} from "../../models/person-admin";

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.css']
})
export class GetReservationsComponent implements OnInit {

  user: PersonAdmin;
  reservations: Reservation []

  constructor(private request: ServicesService, private authservices: AutenticateService, private reservationsServices: ReservationsService) {
  }

  ngOnInit() {
    this.user = this.authservices.getCurrentUser()
    this.getReservations()
  }

  getFormatDate(dateAc: string) {
    let data = new Date(dateAc)
    let dataFormat = data.getFullYear() + "/" + data.getMonth() + "/" + data.getDay()
    return dataFormat
  }

  getReservations() {

    this.reservationsServices.getReservations().subscribe(data => {
      this.reservations = data['data']


    }, error => console.log(error));
  }


}
