import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../../servicesrequests/services.service";
import {Services} from "../../models/services";

@Component({
  selector: 'app-get-services',
  templateUrl: './get-services.component.html',
  styleUrls: ['./get-services.component.css']
})
export class GetServicesComponent implements OnInit {
  services: Services[]

  constructor(private servicesReq: ServicesService) {
  }
  ngOnInit() {
    this.getServices()
  }

  getServices() {
    this.servicesReq.getServices().subscribe(data => {
      this.services = data['data']
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  getImage(base64: string, typeImage: string) {
    let image = 'data:' + typeImage + ";base64," + base64
    return image
  }

}
