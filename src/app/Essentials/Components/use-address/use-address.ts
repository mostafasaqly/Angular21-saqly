import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-use-address',
  imports: [],
  templateUrl: './use-address.html',
  styleUrl: './use-address.css',
})
export class UseAddress {
  countryCode = signal<string>('US');
  constructor() {
    console.log(this.countryCode());
    this.countryCode.set('UK');
    console.log(this.countryCode());

    this.countryCode.update(code => code.toLowerCase());
    console.log(this.countryCode());

    const countryCodeLength = computed(() => this.countryCode().length);
    console.log(countryCodeLength());
    this.test();
  }
  test()
  {
    console.log(this.countryCode());
    const street = signal('Main St');
    console.log(street());
  }

}
