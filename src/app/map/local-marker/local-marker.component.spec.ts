import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMarkerComponent } from './local-marker.component';

describe('LocalMarkerComponent', () => {
  let component: LocalMarkerComponent;
  let fixture: ComponentFixture<LocalMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalMarkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
