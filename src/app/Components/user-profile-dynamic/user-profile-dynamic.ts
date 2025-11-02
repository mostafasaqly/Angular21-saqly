import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface badge { id: number; name: string| any; }

@Component({
  selector: 'app-user-profile-dynamic',
  imports: [FormsModule],
  templateUrl: './user-profile-dynamic.html',
  styleUrl: './user-profile-dynamic.css',
})
export class UserProfileDynamic {
  test:string="test";
  userName = signal<string>("User Name");
  isSaving = signal<boolean>(false);
  admin = signal<boolean>(true);
  badges = signal<badge[]>([
    { id: 1, name: "angular" },
    { id: 2, name: "typescript" }
  ]);

  greeting = computed(() => `Hi, ${this.userName().toUpperCase()} `);

  constructor()
  {
    effect(()=>{
      console.log('badge counts : ', this.badges().length);
    });
    console.log(this.test);

  }

  toggleAdmin()
  {
    this.admin.update(value => !value);
    console.log(this.admin());

  }
  addBadge(name:string)
  {
    this.badges.update( arr => {
      const id = arr.length ? Math.max(...arr.map(b => b.id)) + 1 : 1;
      return [...arr, { id, name } ];
    });
  }
  removeBadge(id:number)
  {
    this.badges.update( arr => arr.filter(b => b.id !== id) );
  }

  saveProfile()
  {
    this.isSaving.set(true);
    setTimeout(() => {
      console.log('Saved ', this.userName());

      this.isSaving.set(false);
    }, 800);
  }

  onNameInput(event: Event )
  {
    const input = event.target as HTMLInputElement;
    this.userName.set(input.value);
    console.log(this.userName());

  }
}


// one way binding {{}} interpolation
// property binding [property]="expression"
// event binding (event)="handler"
//-------------------------------------------
// two way binding [(ngModel)]="property"
