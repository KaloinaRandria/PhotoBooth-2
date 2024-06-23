import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatServiceComponent } from './stat-service.component';

describe('StatServiceComponent', () => {
  let component: StatServiceComponent;
  let fixture: ComponentFixture<StatServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
