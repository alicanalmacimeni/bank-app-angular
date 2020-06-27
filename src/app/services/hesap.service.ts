import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../core/dexie.service';
import { CurrencyConverterService } from './currency-converter.service';
import { HesapHareketleriService } from './hesap-hareketleri.service';

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
      this.hesapHareketleri.olustur(data, hesap_id, "", "Hesap Açma", data.toplam_tutar); // hesap oluşturma log

      if (hesap_aktar) {
        this.table.get({ id: hesap_aktar }).then(res => {
          let aktarilan = this.currencyConverter.converter(data.para_birimi, res.para_birimi, data.toplam_tutar); // para dönüşüm
          this.table.update(hesap_aktar, { toplam_tutar: (res.toplam_tutar - aktarilan) }).then(() => {
            this.hesapHareketleri.olustur(data, hesap_aktar, "", "Giden Transfer", res.toplam_tutar - aktarilan); // aktarılan hesap log
          })
        })
      }
      return true;
    })
  }

  transfer(data) {
    return this.table.get(data.hesap_id).then(gonderici => {

      let aktarilan = this.currencyConverter.converter(data.para_birimi, gonderici.para_birimi, data.toplam_tutar);

      if (gonderici.toplam_tutar < aktarilan) {  // bakiye yeterli ise
        return 'Yetersiz Bakiye';
      }
      this.table.update(data.hesap_id, { toplam_tutar: (gonderici.toplam_tutar - aktarilan) }).then(() => { //gönderici update
        this.hesapHareketleri.olustur(data, gonderici.id, gonderici.hesap_adi, "Giden Transfer", gonderici.toplam_tutar - aktarilan); // gönderici log
      })
      let sorgu = data.aciklama === "virman" ? { hesap_adi: data.hesap_adi } : { hesap_no: +data.hesap_adi }
      this.table.get(sorgu).then(res => {
        let aktarilan2 = this.currencyConverter.converter(data.para_birimi, res.para_birimi, data.toplam_tutar);

        this.table.update(res.id, { toplam_tutar: (res.toplam_tutar + aktarilan2) }).then(() => { // alıcı update
          this.hesapHareketleri.olustur(data, res.id, gonderici.hesap_adi, "Gelen Transfer", res.toplam_tutar + aktarilan2); // alıcı log
        })
      })
      return true;
    })

  }

  getAll() {
    return this.table.toArray();
  }

  hesapNoOlustur() {
    let no: number = 0;
    no = Math.floor(Math.random() * 999999) + 1    // random üret

    return no;
  }

  hesapDetay(id) {
    return this.table.get(id);
  }
}
