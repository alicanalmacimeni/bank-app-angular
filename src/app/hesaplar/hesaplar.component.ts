import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Hesap, HesapService } from '../hesap.service';


@Component({
  selector: 'app-hesaplar',
  templateUrl: './hesaplar.component.html',
  styleUrls: ['./hesaplar.component.scss']
})
export class HesaplarComponent implements OnInit {
  hesaplar = [];
  closeResult = '';
  constructor(private modalService: NgbModal,
    private hesapService: HesapService) { }

  ngOnInit(): void {
    this.hesapService.getAll().then(hesaplar => {
      this.hesaplar = hesaplar;
    })
  }

  open(content) {
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

  hesapEkle(e) {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem("user"));
    let todayDate: Date = new Date();
    let hesap_no = this.hesapService.hesapNoOlustur();
    
    const hesap: Hesap = {
      kullanici_id: user.id,
      hesap_adi: e.target.hesapAdi.value,
      acilis_tutari: e.target.acilis.value,
      para_birimi: e.target.paraBirimi.value,
      hesap_no: hesap_no,
      created_at: todayDate
    };
    this.hesapService.hesapEkle(hesap)
  }

}
