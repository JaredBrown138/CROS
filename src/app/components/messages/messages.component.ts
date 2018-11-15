import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  readMessages: any = [];
  unreadMessages: any = [];
  constructor(public api: APIService, public snackBar: MatSnackBar) {
    this.getMessages();
  }

  ngOnInit() {
  }
  read(message) {
    if (message['read']) {
      this.unreadMessages = this.unreadMessages.filter(msg => msg['id'] != message['id']);
      this.readMessages.push(message);
    } else {
      this.api.markMessageRead({ id: message['id'] }).subscribe(
        res => {
          message['read'] = true;
        },
        err => {
          console.log(err.error.message);
        }
      );

    }
  }
  getMessages() {
    this.api.getMessages().subscribe(
      res => {
        this.readMessages = res.filter(msg => msg['read'] == true);
        this.unreadMessages = res.filter(msg => msg['read'] == false);
      },
      err => {
        this.snackBar.open(err.error['message'], '', {
          duration: 5000
        });
      }
    );
  }

  dateClean(date) {
    return moment(date).fromNow();
  }

}
