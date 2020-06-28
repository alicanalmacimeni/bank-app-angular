import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../core/dexie.service';

export interface Hareket {
  hesap_id: number,
  kullanici_id: number;
  alan_hesap: string;
  gonderen_hesap: string;
  tutar: number;
  bakiye: number;
  para_birimi: string;
  aciklama: string;
  created_at: Date;
}

/* export interface HareketWithID extends Hareket {
  id: number;
} */

@Injectable({
  providedIn: 'root'
})
export class HesapHareketleriService {
  table: Dexie.Table;
  user = JSON.parse(localStorage.getItem("user"));
  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('hesap_hareketleri');
  }

  olustur(data, hesap_id, gonderen, aciklama, bakiye) {
    let todayDate: Date = new Date();

    const hareket: Hareket = {
      hesap_id: hesap_id,
      kullanici_id: this.user.id,
      alan_hesap: data.hesap_adi,
      gonderen_hesap: gonderen,
      tutar: data.toplam_tutar,
      bakiye: bakiye,
      para_birimi: data.para_birimi,
      aciklama: aciklama,
      created_at: todayDate
    };
    this.table.add(hareket)
  }

  hareketGetir(id) {
    return this.table.where('hesap_id').equals(id).reverse().sortBy('created_at');
  }

  kullaniciHareketleri(user_id, limit) {
    if (limit !== 0) {
      return this.table.where({ kullanici_id: user_id, aciklama: "Giden Transfer" }).limit(limit).reverse().sortBy('created_at');
    }
    return this.table.where({ kullanici_id: user_id, aciklama: "Giden Transfer" }).reverse().sortBy('created_at');

  }
}
