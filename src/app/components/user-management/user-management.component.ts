import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  displayedColumns = ['name', 'username', 'created', 'updated', 'edit'];
  users: any = [];
  loading: boolean = true;

  constructor(public api: APIService, public snackBar: MatSnackBar) {
    api.getUsers().subscribe(
      res => {
        this.users = res;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() { }

  /**
   * Format the date using moment.js
   * @param date 
   */
  dateClean(date) {
    return moment(date).fromNow();
  }

  /**
   * Delete the user using the API
   * service.
   * @param userId 
   */
  delete(userId) {
    this.api.deleteUser(userId).subscribe(
      res => {
        if (res['completed']) {
          this.users = this.users.filter(user => user.id != userId);
          this.snackBar.open(res['message'], '', {
            panelClass: ['good', 'snack'],
            duration: 5000
          });
        }
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
   * Update the user using the API service
   * @param userId 
   */
  update(userId: string) {
    this.loading = true
    let selected = this.users.filter(user => user.id == userId);
    let updateObject = {
      id: selected[0].id,
      fName: selected[0].fName,
      lName: selected[0].lName,
      address: selected[0].address,
      phone: selected[0].phone,
      role: selected[0].role,
      email: selected[0].email
    }
    this.api.updateUser(updateObject).subscribe(
      res => {
        if (res['completed']) {
          this.snackBar.open(res['message'], '', {
            panelClass: ['good', 'snack'],
            duration: 5000
          });
          this.loading = false;
        }
      },
      err => {
        this.loading = false;
        this.snackBar.open(err.error['message'], '', {
          panelClass: ['bad', 'snack'],
          duration: 5000
        });
      }
    )
  }

}
