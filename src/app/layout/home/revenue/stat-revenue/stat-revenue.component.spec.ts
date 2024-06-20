import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRevenueComponent } from './stat-revenue.component';

describe('StatRevenueComponent', () => {
  let component: StatRevenueComponent;
  let fixture: ComponentFixture<StatRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
