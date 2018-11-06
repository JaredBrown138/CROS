import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';

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
  steps: Array<boolean> = [false, false, false]
  submitting: boolean = true;
  user = {
    "username": "",
    "password": "",
    "passwordConfirm": "",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "address": "",
    "email": "",
  }



  constructor() {
    this.verifyHeader = "Verifying Details.."
  }

  ngOnInit() {
  }

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
      this.firstStepErrors = "Passwords do not match! <br> ";
      pass = false;
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
    if (this.user.firstName == "" || this.user.lastName == "") {
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
        this.submit();
      }


    }
    return pass;
  }

  submit() {
    setTimeout(() => {
      this.submitting = false;
      this.verifyHeader = "Account Created!"

    }, 3000);
  }
}
