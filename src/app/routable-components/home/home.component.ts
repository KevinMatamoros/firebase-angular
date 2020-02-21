import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLogin: any;
  users: any[];

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userLogin = this.user.getUser();
    if (typeof this.userLogin === "undefined") {
      this.router.navigate(['/login'])
    }
    this.getUsers();
  }

  getUsers(){
    this.user.getUsers().subscribe(data => {
      this.users = data.map(e => {
        console.log(e)
        return {
          
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    });
  }

  logOut() {
    firebase.auth().signOut().then(function () {
      this.user.setUser(undefined);
      this.router.navigate(['/login'])
    }).catch(function (error) {
      console.error(error);
    });

  }

}
