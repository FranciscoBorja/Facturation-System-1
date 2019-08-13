import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubServices} from "../../models/sub-services"
import {MessageService} from "primeng/api";
import {ServicesService} from "../../servicesrequests/services.service";
import {Services} from "../../models/services";
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-register-sub-services',
  templateUrl: './register-sub-services.component.html',
  styleUrls: ['./register-sub-services.component.css'],
  providers: [MessageService]
})
export class RegisterSubServicesComponent implements OnInit {

  userform: FormGroup;
  submitted: boolean;
  services: SelectItem[]
  subService: SubServices = {
    name: '',
    duration: 0,
    price: 0,
    service_id: 0,
  }

  constructor(private fb: FormBuilder, private messageService: MessageService, private request: ServicesService) {

  }

  ngOnInit() {
    this.getServs()
    this.userform = this.fb.group({
        'name': new FormControl('', Validators.required),
        'duration': new FormControl('', Validators.required),
        'price': new FormControl('', Validators.required),
        'service_id': new FormControl('', Validators.required),
      }
    );
  }

  getServs() {
    return this.request.getServices().subscribe(data => {
      this.services = []
      for (let element of data['data']) {

        this.services.push({label: element.name, value: element.id});


      }
    }, error => console.log(error));
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Services created Succesfully'});
    console.log(this.subService)
  }

  onRegister() {

    return this.request.registerSubServices(this.subService.name, this.subService.duration, this.subService.price, this.subService.service_id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }

}
