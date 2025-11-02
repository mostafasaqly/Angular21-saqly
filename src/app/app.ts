import { Component, signal } from '@angular/core';
import { UserProfile } from "./Components/user-profile/user-profile";

@Component({
  selector: 'app-root',
  imports: [UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    const isLoggedIn = signal<boolean>(false);
    isLoggedIn.set(true);
  }
}
