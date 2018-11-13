import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  displayedColumns = ['log', 'short', 'severity'];
  questions: Array<object> = [
    {
      question: "What was your first pet's name?",
      dateCreated: "09/13/18"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
