import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysheetaddComponent } from './paysheetadd.component';

describe('PaysheetaddComponent', () => {
  let component: PaysheetaddComponent;
  let fixture: ComponentFixture<PaysheetaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaysheetaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysheetaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
