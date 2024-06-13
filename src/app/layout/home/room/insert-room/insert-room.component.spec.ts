import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRoomComponent } from './insert-room.component';

describe('InsertRoomComponent', () => {
  let component: InsertRoomComponent;
  let fixture: ComponentFixture<InsertRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
