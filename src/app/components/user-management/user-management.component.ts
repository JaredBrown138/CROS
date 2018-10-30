import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'username', 'created', 'updated', 'edit'];
  sub: boolean = false;
  demoStatus: boolean = true;
  demoUsers: Array<object> = [
    {
      firstName: "Jared",
      lastName: "Brown",
      role: "Admin",
      username: "JaredB131",
      dateCreated: "02/12/18",
      dateUpdated: "09/28/18",
      phone: "(555) 432-1234",
      email: "jared@mail.com",
      address: "123 Street, Omaha, NE 12345"
    }
  ];
  users: Array<object> = [];

  constructor() {
    if (this.demoStatus) {
      this.users = this.demoUsers;
    }
  }

  ngOnInit() {
  }
  edit() {
    this.sub = true;
    console.log("hello");
  }

}
