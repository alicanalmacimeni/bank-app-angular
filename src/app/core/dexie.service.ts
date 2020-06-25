import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('Ng2DexieSample');
    this.version(1).stores({
      users: '++id,&username',
      hesaplar: '++id,&hesap_no,kullanici_id,hesap_adi,acilis_tutari,para_birimi,created_at'
    });
  }
}
