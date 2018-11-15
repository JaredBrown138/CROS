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
    return this.http.request('put', this.urlPrefix + "users", { body: updatedUser, headers: this.buildHeader() });
  }

  addQuestion(question: object): Observable<any> {
    return this.http.request('post', this.urlPrefix + "questions", { body: question, headers: this.buildHeader() });
  }

  getQuestions(): Observable<object> {
    return this.http.request('get', this.urlPrefix + "questions", { headers: this.buildHeader() });
  }

  deleteQuestion(questionId: string): Observable<object> {
    return this.http.request('delete', this.urlPrefix + "questions/" + questionId, { headers: this.buildHeader() });
  }

  submitOrder(order: object): Observable<object> {
    return this.http.request('post', this.urlPrefix + "orders", { body: order, headers: this.buildHeader() });
  }

  getOrders(): Observable<object> {
    return this.http.request('get', this.urlPrefix + "orders", { headers: this.buildHeader() });
  }

  getMessages(): Observable<any> {
    return this.http.request('get', this.urlPrefix + "messages", { headers: this.buildHeader() });
  }

  markMessageRead(messageId: object): Observable<object> {
    return this.http.request('put', this.urlPrefix + "messages", { body: messageId, headers: this.buildHeader() });
  }

  sendMessage(message: object): Observable<object> {
    return this.http.request('post', this.urlPrefix + "messages", { body: message });
  }





  buildHeader() {
    let token = this.storage.getToken();
    console.log("Token Used ---> " + token);
    return new HttpHeaders({
      "x-access-token": token
    });
  }

  getLogs(): Observable<string> {
    return this.http.get((this.urlPrefix + "logs"), { headers: this.buildHeader(), responseType: 'text' });
  }





}
