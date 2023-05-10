import { Component } from '@angular/core';
import { AuthService } from './auth.service';
AuthService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLog: boolean=false;
  constructor(public authService: AuthService) {}
  // get isLoggedIn(): boolean {
  //   this.isLog=this.authService.isLoggedIn;
  //   return this.isLog;
  // }
}
