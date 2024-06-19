import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEditRecordComponent } from './pop-up-edit-record.component';

describe('PopUpEditRecordComponent', () => {
  let component: PopUpEditRecordComponent;
  let fixture: ComponentFixture<PopUpEditRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpEditRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpEditRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
