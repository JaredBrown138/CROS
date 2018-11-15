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
  sub: boolean = false;
  users: any = [];
  loading: boolean = true;

  constructor(public api: APIService, public snackBar: MatSnackBar) {
    api.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(this.users);
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  edit() {
    this.sub = true;
    console.log("hello");
  }

  dateClean(date) {
    return moment(date).fromNow();
  }

  delete(userId) {
    console.log("Deleting User --> " + userId);
    this.api.deleteUser(userId).subscribe(
      res => {
        if (res['completed']) {
          this.users = this.users.filter(user => user.id != userId);
          this.snackBar.open(res['message'], '', {
            duration: 5000
          });
        } else {
          this.snackBar.open(res['message'], '', {
            duration: 5000
          });
        }
      },
      err => {

      }
    )
  }

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
            duration: 5000
          });
          this.loading = false;

        } else {
          this.snackBar.open(res['message'], '', {
            duration: 5000
          });
          this.loading = false;
        }
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )
    console.log(updateObject);
  }

}
