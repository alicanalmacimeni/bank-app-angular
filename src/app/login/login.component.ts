import { Component, OnInit } from '@angular/core';
import { AuthService, UserWithID, User } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mesaj = "";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(e) {
    e.preventDefault()

    const user: User = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    this.authService.loginUser(user).then((val: any) => {
      if (val) {
        this.router.navigate(['/home']);
      } else {
        this.mesaj = "Kullanıcı adı veya şifre hatalı"
      }
    })
  }

}
