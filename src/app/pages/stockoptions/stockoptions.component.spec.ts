import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoptionsComponent } from './stockoptions.component';

describe('StockoptionsComponent', () => {
  let component: StockoptionsComponent;
  let fixture: ComponentFixture<StockoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
