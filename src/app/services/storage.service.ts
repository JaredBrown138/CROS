import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  username: string;
  role: string;

  constructor() { }

  saveSession(token: string, username: string, role: string) {

    let now = new Date();
    let expirationDate = (now.getTime() + 86400000);

    let sessionObject = {
      token: token,
      expirationDate: expirationDate,
      username: username,
      role: role
    }
    this.username = username;
    this.role = role;

    console.table(sessionObject);

    localStorage.setItem('session', JSON.stringify(sessionObject));

  }

  restoreSession() {
    let session = this.getSession();
    this.username = session['username'];
    this.role = session['role'];
  }

  getSession() {
    if (localStorage.length > 0) {
      return JSON.parse(localStorage.getItem('session'));
    }
  }

  getToken() {
    let sessionObject = this.getSession();
    return sessionObject['token'];
  }

  getRole() {
    console.log(this.role);
    return this.role;
  }
}
