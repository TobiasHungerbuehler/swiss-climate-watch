import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataToggleComponent } from './data-toggle.component';

describe('DataToggleComponent', () => {
  let component: DataToggleComponent;
  let fixture: ComponentFixture<DataToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
