import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../core/dexie.service';
import { CurrencyConverterService } from './currency-converter.service';
import { HesapHareketleriService } from './hesap-hareketleri.service';
import { CompilerConfig } from '@angular/compiler';

export interface Hesap {
  hesap_no: number;
  kullanici_id: number;
  hesap_adi: string;
  toplam_tutar: number;
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

  constructor(private dexieService: DexieService,
    private currencyConverter: CurrencyConverterService,
    private hesapHareketleri: HesapHareketleriService) {
    this.table = this.dexieService.table('hesaplar');
  }

  hesapEkle(data, hesap_aktar) {
    return this.table.add(data).then(hesap_id => {
      this.hesapHareketleri.olustur(data, hesap_id, "Hesap Açma", data.toplam_tutar); // hesap oluşturma log

      if (hesap_aktar) {
        this.table.get({ id: hesap_aktar }).then(res => {
          let aktarilan = this.currencyConverter.converter(data.para_birimi, res.para_birimi, data.toplam_tutar);
          this.table.update(hesap_aktar, { toplam_tutar: (res.toplam_tutar - aktarilan) }).then(val => {
            this.hesapHareketleri.olustur(data, hesap_aktar, "Giden Transfer", res.toplam_tutar - aktarilan); // aktarılan hesap log
          })
        })
      }
      return true;
    }).catch(err => {
      return false;
    })
  }

  getAll() {
    return this.table.toArray();
  }

  hesapNoOlustur() {
    let no: number = 0;
    no = Math.floor(Math.random() * 5) + 1    // random üret
    //let kontrol = this.table.where('hesap_no').equals(no)

    return no;
  }

  hesapDetay(id) {
    return this.table.get(id);
  }
}
