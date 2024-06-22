import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitRevenueComponent } from './profit-revenue.component';

describe('ProfitRevenueComponent', () => {
  let component: ProfitRevenueComponent;
  let fixture: ComponentFixture<ProfitRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
