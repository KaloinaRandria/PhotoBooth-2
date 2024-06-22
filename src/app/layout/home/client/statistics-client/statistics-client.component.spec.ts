import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsClientComponent } from './statistics-client.component';

describe('StatisticsClientComponent', () => {
  let component: StatisticsClientComponent;
  let fixture: ComponentFixture<StatisticsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
