import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModiftThemeComponent } from './modift-theme.component';

describe('ModiftThemeComponent', () => {
  let component: ModiftThemeComponent;
  let fixture: ComponentFixture<ModiftThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModiftThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModiftThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
