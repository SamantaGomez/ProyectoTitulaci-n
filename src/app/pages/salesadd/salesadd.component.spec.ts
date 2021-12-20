import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesaddComponent } from './salesadd.component';

describe('SalesaddComponent', () => {
  let component: SalesaddComponent;
  let fixture: ComponentFixture<SalesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
