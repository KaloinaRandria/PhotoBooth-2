import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsReservationComponent } from './statistics-reservation.component';

describe('StatisticsReservationComponent', () => {
  let component: StatisticsReservationComponent;
  let fixture: ComponentFixture<StatisticsReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
