import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTempScaleComponent } from './map-temp-scale.component';

describe('MapTempScaleComponent', () => {
  let component: MapTempScaleComponent;
  let fixture: ComponentFixture<MapTempScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTempScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapTempScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
