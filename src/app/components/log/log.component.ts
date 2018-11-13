import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  displayedColumns = ['time', 'address', 'status', 'info'];
  logs: Array<object> = [
    {
      time: "[13/Nov/2018:03:37:44 +0000]",
      address: ":1",
      status: "200",
      info: "GET /api/test HTTP/1.1"
    },
    {
      time: "[13/Nov/2018:03:36:15 +0000]",
      address: ":1",
      status: "404",
      info: "GET /api/fdss HTTP/1.1"
    },
    {
      time: "[13/Nov/2018:03:36:07 +0000]",
      address: ":1",
      status: "404",
      info: "GET /api/fse HTTP/1.1"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
