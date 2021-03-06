import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../core/dexie.service';

export interface User {
  username: string;
  password: string;
}

export interface UserWithID extends User {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  table: Dexie.Table<UserWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('users');
  }

  addUser(data) {
    return this.table.add(data).then(val => {
      return "Kayıt Başarılı";
    }).catch(err => {
      if (err.name === "ConstraintError") {
        return "Kullanıcı adı zaten alınmış"
      }
      return "Kayıt Başarısız";
    })
  }

  loginUser(data) {
    return this.table.where("username").equals(data.username).first(user => {
      if (user.password === data.password) {
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    }).catch(err => {
      return false;
    })
  }

}
