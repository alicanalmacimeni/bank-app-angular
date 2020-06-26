import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapDetayComponent } from './hesap-detay.component';

describe('HesapDetayComponent', () => {
  let component: HesapDetayComponent;
  let fixture: ComponentFixture<HesapDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
