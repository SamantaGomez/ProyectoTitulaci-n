import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServlistComponent } from './servlist.component';

describe('ServlistComponent', () => {
  let component: ServlistComponent;
  let fixture: ComponentFixture<ServlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
