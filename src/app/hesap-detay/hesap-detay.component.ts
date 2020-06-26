import { Component, OnInit } from '@angular/core';
import { HesapHareketleriService } from '../services/hesap-hareketleri.service';
import { ActivatedRoute } from '@angular/router';
import { HesapService, Hesap } from '../services/hesap.service';

@Component({
  selector: 'app-hesap-detay',
  templateUrl: './hesap-detay.component.html',
  styleUrls: ['./hesap-detay.component.scss']
})
export class HesapDetayComponent implements OnInit {
  hareketler = [];
  detay: Hesap;

  constructor(private hesapHareketleriService: HesapHareketleriService,
    private hesapService: HesapService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id: number = +params.get('id');

      this.hesapService.hesapDetay(id).then(detay => {
        this.detay = detay;
      })

      this.hesapHareketleriService.hareketGetir(id).then(hareketler => {
        this.hareketler = hareketler;
      })
    });
  }
}
