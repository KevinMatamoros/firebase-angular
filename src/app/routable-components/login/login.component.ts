import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '../../utils/model/phone';
import { WindowService } from '../../services/window.service';
import * as firebase from 'firebase/app';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  windowsRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  userId: string;


  flag: any = {
    telephone: true,
    verification: false
  };

  constructor(
    private win: WindowService,
    private user: UserService,
    private router: Router
  ) {
    this.windowsRef = this.win.windowRef;
  }

  ngOnInit() {
    setTimeout(() => {
      this.windowsRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      this.windowsRef.recaptchaVerifier.render();
    }, 1500);

  }

  sendLoginCode() {

    const appVerifier = this.windowsRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.flag.telephone = false;
        this.flag.verification = true;

        this.windowsRef.confirmationResult = result;

      })
      .catch(error => console.log(error));

  }

  verifyLoginCode() {
    this.windowsRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user.setUser(result.user);
        this.userId = result.user.uid;
        this.router.navigate(['/home'])

      })
      .catch(error => {
        this.flag.telephone = true;
        this.flag.verification = false;
      });
  }

}
