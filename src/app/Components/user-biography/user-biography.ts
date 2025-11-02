import { Component, signal } from '@angular/core';
import { UseAddress } from "../use-address/use-address";

interface User{
  name:string;
  age:number;
}

@Component({
  selector: 'app-user-biography',
  imports: [UseAddress],
  templateUrl: './user-biography.html',
  styleUrl: './user-biography.css',
})

export class UserBiography {
  constructor()
  {
    const user = signal<User>({name:'Ali Ahmed', age:30});
    user.set({name:'Sara Mohamed', age:25});

    const userLangugue = signal<string[]>(['English', "Arabic", "French"]);
    userLangugue.update(langs => [...langs, 'Spanish']); // array of objects number boolean etc
  }
}
