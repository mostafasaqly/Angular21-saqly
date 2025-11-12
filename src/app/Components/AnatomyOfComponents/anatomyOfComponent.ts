import { Component, input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-anatomy-component',
  templateUrl:'./anatomyOfComponent.html',
  styles: 'button{margin:100px;} ',
  encapsulation: ViewEncapsulation.None
})
export class AnatomyComponent{
value = input.required<string>();
}
