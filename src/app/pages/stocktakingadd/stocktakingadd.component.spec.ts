import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktakingaddComponent } from './stocktakingadd.component';

describe('StocktakingaddComponent', () => {
  let component: StocktakingaddComponent;
  let fixture: ComponentFixture<StocktakingaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocktakingaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktakingaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
