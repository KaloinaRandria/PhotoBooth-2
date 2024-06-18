import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMaterielComponent } from './stat-materiel.component';

describe('StatMaterielComponent', () => {
  let component: StatMaterielComponent;
  let fixture: ComponentFixture<StatMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatMaterielComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
