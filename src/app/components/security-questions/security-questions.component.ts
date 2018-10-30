import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {
  displayedColumns = ['question', 'dateCreated', 'delete'];
  questions: Array<object> = [
    {
      question: "What was your first pet's name?",
      dateCreated: "09/13/18"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
