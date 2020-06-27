import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferlerComponent } from './transferler.component';

describe('TransferlerComponent', () => {
  let component: TransferlerComponent;
  let fixture: ComponentFixture<TransferlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
