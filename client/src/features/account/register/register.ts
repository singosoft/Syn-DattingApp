import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // membersFormHome = input.required<User[]>();
   cancelRegister = output<boolean>();
  private accoutServices = inject(AccountService);
  protected creds = {} as RegisterCreds;

  register() {
    console.log(this.creds);
    this.accoutServices.register(this.creds).subscribe({
      next: res => {
        console.log(res);
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    console.log('cancelled!')
    this.cancelRegister.emit(false);
  }
}