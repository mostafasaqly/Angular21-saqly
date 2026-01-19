import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-localization',
  imports:[CommonModule],
  templateUrl: './app-localization.component.html',
})
export class AppLocalizationComponent {
  itemsCount = 3;
  today = new Date();
  price = 1999.5;
}
