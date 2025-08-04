import { Component, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { User } from '../../types/user';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected registerMode = signal(false)
  //@Input({required: true}) membersFromApp: User[] = [];
  


  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
