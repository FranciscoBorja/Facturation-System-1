import {Component, OnInit} from '@angular/core';
import {Notifications} from "../../models/notifications";
import {PersonAdmin} from "../../models/person-admin";
import {AutenticateService} from "../../servicesrequests/autenticate.service";
import {MessageService} from "primeng/api";
import {ReservationsService} from "../../servicesrequests/reservations.service";

@Component({
  selector: 'app-requests-of-reservations',
  templateUrl: './requests-of-reservations.component.html',
  styleUrls: ['./requests-of-reservations.component.css'],
  providers: [MessageService]
})
export class RequestsOfReservationsComponent implements OnInit {

  notifications: Notifications []
  user: PersonAdmin;

  constructor(private reservationServices: ReservationsService, private authservices: AutenticateService) {
  }

  ngOnInit() {
    this.user = this.authservices.getCurrentUser()
    this.getAlldNotifications()
  }

  getFormatDate(dateAc: string) {
    let data = new Date(dateAc)
    let dataFormat = data.getFullYear() + "/" + data.getMonth() + "/" + data.getDay()
    return dataFormat
  }

  changeAprob(id: number) {
    this.reservationServices.updateNotification('Aprobado', id).subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }

  changeRechaz(id: number) {
    this.reservationServices.updateNotification('Rechazado', id).subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }

  getAlldNotifications() {

    this.reservationServices.getAllNotifications().subscribe(data => {
      this.notifications = data['data']


    }, error => console.log(error));
  }
}
