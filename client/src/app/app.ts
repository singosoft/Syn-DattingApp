import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Datting App');
  protected members = signal<any>([]);

  async ngOnInit(): Promise<void> {
    // this.http.get('https://localhost:5001/api/Members').subscribe(
    //   {
    //     next: res => {console.log(res); this.members.set(res) },
    //     error: error => console.log(error),
    //     complete: () => console.log('Complted the http request')
    //   }
    // )
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try{
      return lastValueFrom( this.http.get('https://localhost:5001/api/Members'))
    }
    catch(error){
      throw error
    }
  }
  
}
