import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { APIService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  errorMessage: String;

  constructor(
    public router: Router,
    public storage: StorageService,
    public api: APIService
  ) { }

  ngOnInit() { }

  /**
   * Uses the API service to login to 
   * the application.
   */
  login(): void {

    this.errorMessage = "";

    let credentials = {
      username: this.username,
      password: this.password
    }

    this.api.login(credentials).subscribe(
      res => {
        if (res['auth']) {
          this.storage.saveSession(res['token'], res['username'], res['role']);
          //Store user data and go to dashboard
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = res['message'];
        }
      },
      err => {
        console.log(err);
        this.errorMessage = "Unexpected Error!"
      }
    );
  }

}
