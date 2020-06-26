import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  constructor() { }

  converter(ilkBirim, ikinciBirim, tutar) {
    let kurlar = {
      "$": 7,
      "€": 8,
      "Altın": 380,
      "TL": 1
    }
    return kurlar[ilkBirim] * tutar / kurlar[ikinciBirim];
  }
}
