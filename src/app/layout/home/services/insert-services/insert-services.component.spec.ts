import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertServicesComponent } from './insert-services.component';

describe('InsertServicesComponent', () => {
  let component: InsertServicesComponent;
  let fixture: ComponentFixture<InsertServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
