import {Component, OnInit} from '@angular/core';
import {AutenticateService} from "../../servicesrequests/autenticate.service";
import {PersonAdmin} from "../../models/person-admin";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
  users: PersonAdmin[]

  constructor(private authservices: AutenticateService, private router: Router) {
  }

  ngOnInit() {
    this.getAllUsers()
  }

  update(id) {
    this.authservices.setIdUser(id)
    this.router.navigate(['user/upload'])
    console.log("enter in button", id)
  }

  getAllUsers() {
    this.authservices.getAllUsers().subscribe(data => {
      this.users = data['data']
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
}
