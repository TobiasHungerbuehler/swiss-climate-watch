import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempDisplaysComponent } from './temp-displays.component';

describe('TempDisplaysComponent', () => {
  let component: TempDisplaysComponent;
  let fixture: ComponentFixture<TempDisplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempDisplaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempDisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
