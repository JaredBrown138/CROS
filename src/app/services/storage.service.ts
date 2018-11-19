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

    localStorage.setItem('session', JSON.stringify(sessionObject));

  }

  /**
   * Looks into localStorage and sets in memory properties
   */
  restoreSession() {
    let session = this.getSession();
    if (session != undefined) {
      this.username = session['username'];
      this.role = session['role'];
      this.isLoggedIn = session['isLoggedIn']
    }

  }

  /**
   * Clears the in memory properties as well as
   * well as the localStorage values.
   */
  logOut() {
    this.username = "";
    this.role = "";
    this.isLoggedIn = false;
    localStorage.removeItem('session');
    this.router.navigateByUrl('login')
  }

  /**
   * Returns the session data from LocalStorage
   */
  getSession() {
    if (localStorage.length > 0) {
      return JSON.parse(localStorage.getItem('session'));
    } else {
      return undefined;
    }
  }

  /**
   * Returns the x-access token from
   * localStorage
   */
  getToken() {
    let sessionObject = this.getSession();
    if (sessionObject == undefined) {
      return "no-token"
    }
    return sessionObject['token'];
  }

  /**
   * A getter for the role property
   */
  getRole() {
    return this.role;
  }

  /**
   * A getter for the username property
   */
  getUsername() {
    return this.username;
  }
}
