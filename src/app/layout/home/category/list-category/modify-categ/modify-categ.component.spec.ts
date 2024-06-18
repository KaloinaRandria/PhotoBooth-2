import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategComponent } from './modify-categ.component';

describe('ModifyCategComponent', () => {
  let component: ModifyCategComponent;
  let fixture: ComponentFixture<ModifyCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCategComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
