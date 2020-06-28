import { Component, OnInit } from '@angular/core';
import { HesapService } from '../services/hesap.service';

@Component({
  selector: 'app-hesap-kart',
  templateUrl: './hesap-kart.component.html',
  styleUrls: ['./hesap-kart.component.scss']
})
export class HesapKartComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  hesaplar = [];

  constructor(private hesapService: HesapService) { }

  ngOnInit(): void {
    this.hesapService.hesapGetir(this.user.id).then(hesaplar => {
      this.hesaplar = hesaplar;
    })
  }

}
