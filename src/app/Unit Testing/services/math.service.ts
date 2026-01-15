import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MathService {
  sum(a: number, b: number) {
    return a + b;
  }
}
