import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDoneComponent } from './reservation-done.component';

describe('ReservationDoneComponent', () => {
  let component: ReservationDoneComponent;
  let fixture: ComponentFixture<ReservationDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationDoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
