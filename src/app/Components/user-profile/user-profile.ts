import { Component, computed, signal } from '@angular/core';
import { ProfilePhoto } from "../profile-photo/profile-photo";
import { UserBiography } from "../user-biography/user-biography";
import { UserProfileDynamic } from "../user-profile-dynamic/user-profile-dynamic";

@Component({
  selector: 'user-profile',
  imports: [ProfilePhoto, UserBiography, UserProfileDynamic],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());
  activateTrial() {
    this.isTrial.set(true);
  }





 constructor(){
  const firstName = signal<string>('Ali');
  const firstNameCapitalized = computed(() => firstName().toUpperCase());
  console.log(firstNameCapitalized());

  if(true){
    firstName.set('Mostafa');
  }
  firstName.update(name => this.logName(name));
  console.log(firstName());


  console.log(firstNameCapitalized());


  //firstNameCapitalized.update(()=> 'Ahmed'); // set

 }
  logName( name:string) : string
  {
    name = name.toLocaleLowerCase();
    console.log(name);
    return name;
  }
}
