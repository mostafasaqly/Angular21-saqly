import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class FakeUserService {
  getUser(id: string) {
    const user: User = {
      id,
      name: `User ${id}`,
      role: id === '1' ? 'Admin' : 'Viewer',
    };
    return of(user).pipe(delay(500)); // simulate API call
  }
}
