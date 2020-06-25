import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesaplarComponent } from './hesaplar.component';

describe('HesaplarComponent', () => {
  let component: HesaplarComponent;
  let fixture: ComponentFixture<HesaplarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesaplarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesaplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
