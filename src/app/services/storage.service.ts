import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  username: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(public router: Router) { }

  saveSession(token: string, username: string, role: string) {

    let now = new Date();
    let expirationDate = (now.getTime() + 86400000);

    let sessionObject = {
      token: token,
      expirationDate: expirationDate,
      username: username,
      role: role,
      isLoggedIn: true
    }
    this.username = username;
    this.role = role;
    this.isLoggedIn = true;

    console.table(sessionObject);

    localStorage.setItem('session', JSON.stringify(sessionObject));

  }

  restoreSession() {
    let session = this.getSession();
    if (session != undefined) {
      this.username = session['username'];
      this.role = session['role'];
      this.isLoggedIn = session['isLoggedIn']
    }

  }

  logOut() {
    this.username = "";
    this.role = "";
    this.isLoggedIn = false;
    localStorage.removeItem('session');
    this.router.navigateByUrl('login')
  }

  getSession() {
    if (localStorage.length > 0) {
      return JSON.parse(localStorage.getItem('session'));
    } else {
      return undefined;
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
  getUsername() {
    return this.username;
  }
}
