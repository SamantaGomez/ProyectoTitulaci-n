import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServaddComponent } from './servadd.component';

describe('ServaddComponent', () => {
  let component: ServaddComponent;
  let fixture: ComponentFixture<ServaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
