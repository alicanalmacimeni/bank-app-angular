import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('Ng2DexieSample');
    this.version(1).stores({
      users: '++id,&username',
      hesaplar: '++id,hesap_no,kullanici_id,hesap_adi,toplam_tutar,para_birimi,created_at',
      hesap_hareketleri: '++id,hesap_id,alan_hesap,tutar,para_birimi,bakiye,aciklama,created_at'
    });
  }
}