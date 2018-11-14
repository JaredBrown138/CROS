import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscribable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  urlPrefix: String = "/api/";

  constructor(
    public http: HttpClient,
    public storage: StorageService,
  ) {

  }

  registerUser(userObject: object): Observable<object> {
    return this.http.post((this.urlPrefix + "users"), userObject);
  }

  login(credentials: object): Observable<object> {
    return this.http.post((this.urlPrefix + "login"), credentials);
  }

  getUsers(): Observable<object> {
    return this.http.get((this.urlPrefix + "users"), { headers: this.buildHeader() });
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.request('delete', this.urlPrefix + "users/" + userId, { headers: this.buildHeader() });
  }

  updateUser(updatedUser: object): Observable<object> {
    return this.http.request('put', this.urlPrefix + "users/", { body: updatedUser, headers: this.buildHeader() });
  }

  buildHeader() {
    let token = this.storage.getToken();
    console.log("Token Used ---> " + token);
    return new HttpHeaders({
      "x-access-token": token
    });
  }





}
