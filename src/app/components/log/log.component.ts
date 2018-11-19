import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../services/api.service';
import * as moment from 'moment';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  order: number = 0; //0 Newest to oldest | 1 Oldest to newest
  displayedColumns = ['date', 'method', 'url', 'status', 'remote-addr', 'response-time', 'user-agent'];
  logs: Array<string> = [];
  loading: boolean = true;

  oldToNew: boolean = false;
  newToOld: boolean = true;

  constructor(public api: APIService) {
    this.retrieveLogs();
  }
  //const morganFormat = ':date[iso]|:method|:url|:status|:remote-addr|:response-time|:user-agent';
  ngOnInit() {
  }

  toggleSort() {
    if (this.oldToNew) {
      this.oldToNew = false;
      this.newToOld = true;
      this.logs.reverse();
      this.table.renderRows();
    } else {
      this.oldToNew = true;
      this.newToOld = false;
      this.logs.reverse();
      this.table.renderRows();
    }
  }

  /**
   * Retrieves logs from using the api service
   */
  retrieveLogs() {
    this.api.getLogs().subscribe(
      res => {
        this.loading = false;
        this.prepareLogs(res.split('\n'));

      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * A funciton which formats the logs to ready them
   * for display.
   * @param logsArray 
   */
  prepareLogs(logsArray) {
    let logToWrite = [];
    let logs = logsArray;
    logs = logs.filter(log => log != ""); //clear empty lines
    if (this.order == 0) {
      logs.reverse();
    }
    logs.forEach((e, i, a) => {
      let subArray = e.split('|');
      let logObject = {
        date: subArray[0],
        method: subArray[1],
        url: subArray[2],
        status: subArray[3],
        remoteAddr: subArray[4],
        responseTime: subArray[5],
        userAgent: subArray[6]
      };
      a[i] = logObject;

    });
    this.logs = logs;
  }

  /**
   * Helper function which formats the date.
   * @param date 
   */
  dateClean(date) {
    return moment(date).fromNow();
  }

}
