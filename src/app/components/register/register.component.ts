import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { APIService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  verifyHeader: string;
  firstStepErrors: string;
  secondStepErrors: string;
  thirdStepErrors: string;
  ready: boolean = false;
  underway: boolean = true;
  passwordRegex: RegExp = new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");

  questions: Array<object> = [
    { q: '', a: '' },
    { q: '', a: '' },
    { q: '', a: '' },
  ];

  availableQuestions: any = [];
  steps: Array<boolean> = [false, false, false, false]
  submitting: boolean = true;

  user = {
    "username": "",
    "password": "",
    "passwordConfirm": "",
    "fName": "",
    "lName": "",
    "phone": "",
    "address": "",
    "email": "",
  }

  constructor(public router: Router, public api: APIService, public storage: StorageService) {
    this.verifyHeader = "Verifying Details..";
    this.api.getQuestions().subscribe(
      res => {
        this.availableQuestions = res['questions'];
      },
      err => {
        console.log(err);
        this.router.navigateByUrl('500')
      }
    );
  }

  ngOnInit() { }


  firstStep() {
    let pass = true;
    this.firstStepErrors = ""; //reset error output
    if (this.user.username == "") {
      this.firstStepErrors = "Username not supplied! <br> ";
      pass = false;
    }
    if (this.user.password == "") {
      this.firstStepErrors += "Password not supplied! <br> ";
      pass = false;
    }
    if (this.user.password != this.user.passwordConfirm) {
      this.firstStepErrors += "Passwords do not match! <br> ";
      pass = false;
    }
    if (!this.passwordRegex.exec(this.user.password)) {
      this.firstStepErrors += "Password must be at least 8 characters in length " +
        "and include at least one uppercase character and number!<br> ";
      pass = false
    }
    if (pass) {
      this.steps[0] = true;
      this.stepper.next();

    }
    return pass;

  }

  secondStep() {
    let pass = true;
    this.secondStepErrors = ""; //reset error output
    if (this.user.fName == "" || this.user.lName == "") {
      this.secondStepErrors = "Please Include Your Complete Name <br> ";
      pass = false;
    }
    if (this.user.phone == "") {
      this.secondStepErrors += "Phone not supplied! <br> ";
      pass = false;
    }
    if (this.user.address == "") {
      this.secondStepErrors += "Address not supplied! <br> ";
      pass = false;
    }
    if (this.user.email == "") {
      this.secondStepErrors += "Email not supplied! <br> ";
      pass = false;
    }

    if (pass) {
      this.steps[1] = true;
      if (!this.firstStep()) {
        this.stepper.previous();
      } else {
        this.stepper.next();
      }


    }
    return pass;
  }

  thirdStep() {
    this.user['questions'] = this.questions;
    this.ready = true;
    this.stepper.next();
    this.submit();
  }

  submit() {
    this.api.registerUser(this.user).subscribe((res) => {

      this.submitting = false;
      this.verifyHeader = "Account Created!";
      this.storage.logOut();

    },
      error => {
        console.log(error);
        this.router.navigateByUrl('500');
      });
  }
}
