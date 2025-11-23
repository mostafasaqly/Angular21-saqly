import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileCardComponent } from './profile-card';
import { ExpensiveWidgetComponent } from './expensive-widget';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileCardComponent, ExpensiveWidgetComponent],
  templateUrl: './base.html',
})
export class BaseComponent {
  title = 'Angular Templates – One Demo';
  today = new Date();

  user = {
    name: 'Mostafa Saqly',
    level: 'Senior Angular Developer',
    points: 10,
  };

  isPro = true;
  showDetails = true;

  newSkill = '';
  skills: string[] = ['Angular', 'TypeScript', 'HTML', 'CSS'];

  // EVENT LISTENERS + CONTROL FLOW HELPERS
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  addSkill() {
    const value = this.newSkill.trim();
    if (!value) return;

    this.skills.push(value);
    this.newSkill = '';
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  trackByIndex(i: number) {
    return i;
  }
}
