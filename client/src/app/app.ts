import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav , Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);

  private http = inject(HttpClient);
  protected readonly title = signal('Datting App');
  protected members = signal<User[]>([]);

  async ngOnInit(): Promise<void> {
    // this.http.get('https://localhost:5001/api/Members').subscribe(
    //   {
    //     next: res => {console.log(res); this.members.set(res) },
    //     error: error => console.log(error),
    //     complete: () => console.log('Complted the http request')
    //   }
    // )
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user')
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try{
      return lastValueFrom( this.http.get<User[]>('https://localhost:5001/api/Members'))
    }
    catch(error){
      throw error
    }
  }
  
}
