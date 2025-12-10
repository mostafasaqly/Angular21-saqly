import { Component, signal } from '@angular/core';
import { HttpListComponent } from './http-list.component';
import { HttpCreateComponent } from './http-create.component';
import { HttpResourceDemoComponent } from './http-resource-demo.component';
import { UsersDemoComponent } from "./users/users-demo.component";


type HttpView = 'list' | 'create' | 'resource' |'users';

@Component({
  selector: 'app-http',
  imports: [HttpListComponent, HttpCreateComponent, HttpResourceDemoComponent, UsersDemoComponent],
  template: `
    <h1>Angular HTTP Client Demo</h1>

    <nav class="tabs">
      <button class="btn btn-primary" (click)="view.set('list')"     [class.active]="view() === 'list'">GET – list posts</button>
      <button class="btn btn-primary" (click)="view.set('create')"   [class.active]="view() === 'create'">POST – create post</button>
      <button class="btn btn-primary" (click)="view.set('resource')" [class.active]="view() === 'resource'">httpResource</button>
      <button class="btn btn-primary" (click)="view.set('users')"    [class.active]="view() === 'users'">Users API</button>
    </nav>


    <section >
      @switch (view()) {
      @case ("list") {
      <http-list ></http-list>
      }
      @case ("create") {
      <http-create ></http-create>
      }
      @case ("resource") {
      <http-resource-demo ></http-resource-demo>
    }
    @case ("users") {
      <users-demo ></users-demo>
    }
    @default {}
  }
    </section>


  `,
  styles: [`
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin-bottom: 1rem;
    }
    .tabs button {
      padding: .35rem .75rem;
      border-radius: 4px;
      border: 1px solid #444;
      background: #111;
      cursor: pointer;
    }
    .tabs button.active {
      background: #1976d2;
      border-color: #1976d2;
      color: #fff;
    }
    section {
      border: 1px solid #333;
      border-radius: 6px;
      padding: 1rem;
    }
  `],
})
export class AppHttpComponent {
  view = signal<HttpView>('list');
}
