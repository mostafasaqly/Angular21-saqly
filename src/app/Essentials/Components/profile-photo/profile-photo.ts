import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  imports: [],
  templateUrl: './profile-photo.html',
  styleUrl: './profile-photo.css',
})
export class ProfilePhoto {
  counter = signal<number>(0);

  constructor()
  {
    this.counter.set( this.counter()+1 );
  }
}
