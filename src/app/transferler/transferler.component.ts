import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HesapService, Hesap } from '../services/hesap.service';
import { HesapHareketleriService } from '../services/hesap-hareketleri.service';

@Component({
  selector: 'app-transferler',
  templateUrl: './transferler.component.html',
  styleUrls: ['./transferler.component.scss']
})
export class TransferlerComponent implements OnInit {
  hesaplar = [];
  hareketler = [];
  closeResult = '';
  selectModal = '';
  color = 'purple';
  user = JSON.parse(localStorage.getItem("user"));

  constructor(private modalService: NgbModal,
    private hesapService: HesapService,
    private hesapHareketleriService: HesapHareketleriService) { }

  ngOnInit(): void {
    this.hesapService.getAll().then(hesaplar => {
      this.hesaplar = hesaplar;
    })
    this.hesapHareketleriService.kullaniciHareketleri(this.user.id, 0).then(hareketler => {
      this.hareketler = hareketler;
    })
  }

  open(content, tur) {
    this.selectModal = tur;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  transfer(e) {
    e.preventDefault()
    let todayDate: Date = new Date();

    const data = {
      hesap_id: +e.target.gonderen.value,
      hesap_adi: e.target.alici.value,
      toplam_tutar: +e.target.tutar.value,
      bakiye: 0,
      para_birimi: e.target.paraBirimi.value,
      aciklama: this.selectModal,
      islem: "",
      created_at: todayDate
    };

    this.hesapService.transfer(data).then(res => {
      this.ngOnInit();
    })
  }

}
