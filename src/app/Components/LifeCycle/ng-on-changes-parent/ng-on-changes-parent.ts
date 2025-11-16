import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoOnChangesChild } from '../no-on-changes-child/no-on-changes-child';

@Component({
  selector: 'app-ng-on-changes-parent',
  imports: [FormsModule, NoOnChangesChild],
  templateUrl: './ng-on-changes-parent.html',
  styleUrl: './ng-on-changes-parent.css',
})
export class NgOnChangesParent {
userName: string = 'Ali';
userAge: number = 25;
showChild: boolean = true;

toggleChild(): void {
  this.showChild = !this.showChild;
}
}
