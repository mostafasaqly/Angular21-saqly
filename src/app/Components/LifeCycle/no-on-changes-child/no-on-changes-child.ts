import { ChangeDetectionStrategy, Component, input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-no-on-changes-child',
  imports: [],
  templateUrl: './no-on-changes-child.html',
  styleUrl: './no-on-changes-child.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoOnChangesChild {

  name = input<string>('');
  age = input<number>(0);

  constructor()
  {
    console.log("Constructor fired");
  }

  ngOnInit(): void {
    console.log("on init fired");

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ng on chnages fired");
    for(const inputName in changes)
    {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);

    }

  }
  ngOnDestroy(): void {
    console.log("ng on destroy Fired");

  }

}


