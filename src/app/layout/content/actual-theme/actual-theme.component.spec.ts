import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualThemeComponent } from './actual-theme.component';

describe('ActualThemeComponent', () => {
  let component: ActualThemeComponent;
  let fixture: ComponentFixture<ActualThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
