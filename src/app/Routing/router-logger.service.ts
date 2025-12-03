import { Injectable } from '@angular/core';
import { Router, Event } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterLoggerService {
  constructor(router: Router) {
    router.events.subscribe((e: Event) => {
      console.log('Router event', e);
    });
  }
}
