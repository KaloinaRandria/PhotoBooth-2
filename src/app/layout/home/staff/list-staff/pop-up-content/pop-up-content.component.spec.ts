import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpContentComponent } from './pop-up-content.component';

describe('PopUpContentComponent', () => {
  let component: PopUpContentComponent;
  let fixture: ComponentFixture<PopUpContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
