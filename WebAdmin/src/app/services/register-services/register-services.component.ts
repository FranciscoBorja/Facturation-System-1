import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService, SelectItem} from "primeng/api";
import {ServicesService} from "../../servicesrequests/services.service";
import {Services} from "../../models/services";

@Component({
  selector: 'app-register-services',
  templateUrl: './register-services.component.html',
  styleUrls: ['./register-services.component.css'],
  providers: [MessageService]
})
export class RegisterServicesComponent implements OnInit {

  userform: FormGroup;
  submitted: boolean;
  service: Services = {
    name: '',
    description: '',
  }

  constructor(private fb: FormBuilder, private messageService: MessageService, private services: ServicesService) {

  }

  ngOnInit() {
    this.userform = this.fb.group({
        'name': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.compose([Validators.required]))
      }
    );
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Services created Succesfully'});
    console.log(this.service)
  }

  onRegister() {

    return this.services.registerServices(this.service.name, this.service.description).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }

}
