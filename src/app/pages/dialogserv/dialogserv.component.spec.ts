import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogservComponent } from './dialogserv.component';

describe('DialogservComponent', () => {
  let component: DialogservComponent;
  let fixture: ComponentFixture<DialogservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
