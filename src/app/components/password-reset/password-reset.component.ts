import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  answers: Array<string> = ["", "", ""];
  questions: Array<string> = [
    "What is the name of your favorite pet?",
    "Where did you graduate from High School?",
    "What is your mother's maiden name?"
  ]
  constructor() { }

  ngOnInit() {
  }

}
