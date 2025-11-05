import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Calculator {
   add(a: number, b: number): number {
    this.logFunction("Adding numbers");
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  private logFunction(message: string): void {
    console.log("Calculator Log: " + message);
  }
}
