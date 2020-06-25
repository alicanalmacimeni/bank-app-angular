import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from './core/dexie.service';

export interface Hesap {
  hesap_no: number;
  kullanici_id: number;
  hesap_adi: string;
  acilis_tutari: number;
  para_birimi: string;
  created_at: Date;
}

export interface HesapWithID extends Hesap {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class HesapService {
  table: Dexie.Table<HesapWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('hesaplar');
  }

  hesapEkle(data) {
    this.table.add(data).then(val => {
      //console.log("eklendiii")
    }).catch(err => {
      console.log(err)
    })
  }

  getAll() {
    return this.table.toArray();
  }

  hesapNoOlustur() {
    let kontrol: boolean = false;
    let no: number = 0;

    while (true) {
      console.log("girdi")
      
      no = Math.floor(Math.random() * 5) + 1    // random üret
      this.table.where('hesap_no').equals(no).first(hesap => {
        if (hesap) {
          kontrol = true;
        } else {
          kontrol = false;
        }
      })

      if (!kontrol) {
        break;
      }

    }



    return no;
  }
}
