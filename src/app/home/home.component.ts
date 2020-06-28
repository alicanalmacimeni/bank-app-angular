import { Component, OnInit } from '@angular/core';
import { HesapHareketleriService } from '../services/hesap-hareketleri.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  hareketler = [];
  constructor(private hesapHareketleriService: HesapHareketleriService) { }

  ngOnInit(): void {
    this.hesapHareketleriService.kullaniciHareketleri(this.user.id, 10).then(hareketler => {
      this.hareketler = hareketler;
      console.log(hareketler)
    })
  }



}
