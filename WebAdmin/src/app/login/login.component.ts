import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AutenticateService} from "../servicesrequests/autenticate.service";
import {PersonAdmin} from "../models/person-admin";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService,]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailValidation = /^[\w]+@+[a-z 0-9]+\.+[a-z A-Z 0-9 .]*/
  submitted: boolean;
  description: string;
  loading: boolean;
  validate: boolean;
  fallo: boolean;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private authservices: AutenticateService, private router: Router) {

  }

  private user: PersonAdmin = {
    email: '',
    password: ''
  }
  ngOnInit() {
    let value = this.authservices.getValidate()
    if (value) {
      this.router.navigate(['user/register'])
    }
    this.loginForm = this.formBuilder.group({
        'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailValidation)])),
        'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))

      }
    );
  }

  login() {
    this.submitted = true;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'loggin Succesfully'});
  }

  close() {
    if (this.fallo == false) {
      this.router.navigate(['user/profile'])
    } else {
      this.router.navigate(['home'])
    }
  }


  onLogin() {
    this.loading = true
    return this.authservices.loginUser(this.user.password, this.user.email).subscribe(data => {
      console.log(data);
      this.authservices.setUser(data.response)
      let token = data.session_id
      this.authservices.setToken(token)
      this.validate = true
      this.authservices.setLogInSubbmitted(this.validate)
      if (data && this.validate) {
        this.loading = false
        this.login()
        this.refresh()
      }
    }, error => {
      console.log(error)
      this.fallo = true
      this.submitted = true;
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'login Failed'});
    });
  }


  get diagnostic() {
    return JSON.stringify(this.loginForm.value);
  }

  refresh() {

    window.location.reload()


  }


}
