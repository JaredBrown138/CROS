import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  selectedQuestions: Array<object> = [
    { q: '', a: '' },
    { q: '', a: '' },
    { q: '', a: '' },
  ];

  stepTwo: boolean = false;
  stepThree: boolean = false;
  password: String;
  passwordConfirm: String;
  username: string = "";
  answers: Array<string> = ["", "", ""];

  questions: Array<string> = [
    "What is the name of your favorite pet?",
    "Where did you graduate from High School?",
    "What is your mother's maiden name?"
  ]

  constructor(public router: Router, public api: APIService, public snackBar: MatSnackBar) {
    this.api.getQuestions().subscribe(
      res => {
        this.questions = res['questions'];
      },
      err => {
        console.log(err);
        this.router.navigateByUrl('500');
      }
    );

  }

  /**
   * Gets the username and 
   */
  toStepTwo() {
    if (this.username == undefined || this.username == "") {
      this.snackBar.open('Please provide username!', '', {
        panelClass: ['bad', 'snack'],
        duration: 5000
      });
    } else {
      this.stepTwo = true;
    }
  }

  /**
   * Calls the API service to check to see if the questions
   * provided were correct. 
   */
  checkQuestions() {
    let writeObject = { username: this.username, questions: this.selectedQuestions }
    this.api.resetPassword(writeObject).subscribe(
      res => {
        this.snackBar.open(res['message'], '', {
          panelClass: ['good', 'snack'],
          duration: 5000
        });
        this.stepTwo = false;
        this.stepThree = true;
      },
      err => {
        this.snackBar.open(err.error['message'], '', {
          panelClass: ['bad', 'snack'],
          duration: 5000
        });
      }
    )
  }

  /**
   * Resebd the Q&A's along with the new password
   * to reset the password.
   */
  submit() {
    let writeObject = { username: this.username, questions: this.selectedQuestions, password: this.password };
    if (this.password != this.passwordConfirm) {
      this.snackBar.open("Passwords do not match!", '', {
        panelClass: ['bad', 'snack'],
        duration: 5000
      });
    } else {
      this.api.resetPassword(writeObject).subscribe(
        res => {
          this.snackBar.open(res['message'], '', {
            panelClass: ['good', 'snack'],
            duration: 5000
          });
          this.router.navigateByUrl('login');
        },
        err => {
          this.snackBar.open(err.error['message'], '', {
            panelClass: ['bad', 'snack'],
            duration: 5000
          });
        }
      );
    }
  }

  ngOnInit() {
  }

}
