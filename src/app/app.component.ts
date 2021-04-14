import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankAccountApp';
  isAuthenticated = false;
  
  async logout(): Promise<void> {
    // todo
  }
}
