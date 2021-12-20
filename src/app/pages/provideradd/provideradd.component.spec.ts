import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideraddComponent } from './provideradd.component';

describe('ProvideraddComponent', () => {
  let component: ProvideraddComponent;
  let fixture: ComponentFixture<ProvideraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
