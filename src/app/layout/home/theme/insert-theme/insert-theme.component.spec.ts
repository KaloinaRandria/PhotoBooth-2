import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertThemeComponent } from './insert-theme.component';

describe('InsertThemeComponent', () => {
  let component: InsertThemeComponent;
  let fixture: ComponentFixture<InsertThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
