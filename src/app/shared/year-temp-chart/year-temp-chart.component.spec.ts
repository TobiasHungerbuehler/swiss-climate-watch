import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearTempChartComponent } from './year-temp-chart.component';

describe('YearTempChartComponent', () => {
  let component: YearTempChartComponent;
  let fixture: ComponentFixture<YearTempChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearTempChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearTempChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
