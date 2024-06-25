import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSectionComponent } from './temperature-section.component';

describe('TemperatureSectionComponent', () => {
  let component: TemperatureSectionComponent;
  let fixture: ComponentFixture<TemperatureSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
