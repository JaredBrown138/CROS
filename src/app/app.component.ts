import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cros';

  constructor(public storage: StorageService) {
    this.storage.restoreSession();
  }
}
