import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapKartComponent } from './hesap-kart.component';

describe('HesapKartComponent', () => {
  let component: HesapKartComponent;
  let fixture: ComponentFixture<HesapKartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapKartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapKartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
