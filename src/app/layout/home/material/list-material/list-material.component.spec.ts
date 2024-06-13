import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaterialComponent } from './list-material.component';

describe('ListMaterialComponent', () => {
  let component: ListMaterialComponent;
  let fixture: ComponentFixture<ListMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
