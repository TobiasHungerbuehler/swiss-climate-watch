import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateboxComponent } from './datebox.component';

describe('DateboxComponent', () => {
  let component: DateboxComponent;
  let fixture: ComponentFixture<DateboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
