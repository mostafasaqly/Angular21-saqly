import { Component, effect, linkedSignal, signal } from '@angular/core';
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}
@Component({
  selector: 'app-linked-signal',
  imports: [],
  templateUrl: './linked-signal.html',
  styleUrl: './linked-signal.css',
})
export class LinkedSignal {
  activeUser = signal<User>({id:123, name: "Ali", isAdmin: true});
  activeUserEditCopy = linkedSignal(() => this.activeUser(), {
  equal: (a, b) => a.id === b.id,
});

constructor() {
  effect(()=> {
    console.log("Active User changed:", this.activeUser());
    console.log("Activate user edit copy", this.activeUserEditCopy());

  })
}
}
