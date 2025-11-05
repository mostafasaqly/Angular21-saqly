import { Component, inject, signal } from '@angular/core';
import {  UserProfile } from "./Essentials/Components/user-profile/user-profile";
import { Receipt } from "./Essentials/DependencyInjection/receipt/receipt";
import { Calculator } from './Essentials/DependencyInjection/calculator';

@Component({
  selector: 'app-root',
  imports: [UserProfile, Receipt],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    const isLoggedIn = signal<boolean>(false);
    isLoggedIn.set(true);
  }
  private calculator = inject(Calculator);
totalCost = signal( this.calculator.subtract(200, 100));
}
