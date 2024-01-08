import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Account } from './models/account.model';
import { ACCOUNTS } from './data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private accounts: Account[] = ACCOUNTS;

  constructor() {}

  getAllUsers() {
    // return this.users;
  }

  getAllAcounts() {
    return this.accounts;
  }

/*   login(username: string, password: string): boolean {
    for (let user of this.users) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    return false;
  } */
}
