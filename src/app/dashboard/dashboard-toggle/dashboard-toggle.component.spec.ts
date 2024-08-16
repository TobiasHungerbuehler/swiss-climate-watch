import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToggleComponent } from './dashboard-toggle.component';

describe('DashboardToggleComponent', () => {
  let component: DashboardToggleComponent;
  let fixture: ComponentFixture<DashboardToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
