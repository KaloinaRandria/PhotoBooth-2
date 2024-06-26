import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitStatComponent } from './profit-stat.component';

describe('ProfitStatComponent', () => {
  let component: ProfitStatComponent;
  let fixture: ComponentFixture<ProfitStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
