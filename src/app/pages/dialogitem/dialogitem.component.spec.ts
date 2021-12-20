import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogitemComponent } from './dialogitem.component';

describe('DialogitemComponent', () => {
  let component: DialogitemComponent;
  let fixture: ComponentFixture<DialogitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
