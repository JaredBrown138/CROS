import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  loading: boolean = true;
  invoices: any = [];

  constructor(public api: APIService, public snackBar: MatSnackBar) {
    api.getMyOrders().subscribe(
      res => {
        this.invoices = res;
        this.invoices.reverse();
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Format the date using moment.js
   * @param date 
   */
  dateClean(date) {
    return moment(date).fromNow();
  }

}
