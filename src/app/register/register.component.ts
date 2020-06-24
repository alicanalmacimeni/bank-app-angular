import { Component, OnInit } from '@angular/core';
import { AuthService, UserWithID, User } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  mesaj = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(e) {
    e.preventDefault()
    const user: User = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    if (user.password.length < 6) {
      this.mesaj = "Şifreniz en az 6 karakter olmalı."
      return false;
    }
    this.authService.addUser(user).then((val: string) => {
      this.mesaj = val;
    })
  }

}
