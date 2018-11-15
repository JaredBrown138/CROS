import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  subject: string;
  message: string;

  constructor(public api: APIService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  send() {
    let writeObject = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    }

    this.api.sendMessage(writeObject).subscribe(
      res => {
        this.snackBar.open(res['message'], '', {
          duration: 5000
        });
        this.name = "";
        this.email = "";
        this.subject = "";
        this.message = "";
      },
      err => {
        this.snackBar.open(err.error['message'], '', {
          duration: 5000
        });
      }
    );
  }

}
