import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestRefListComponent } from './highest-ref-list.component';

describe('HighestRefListComponent', () => {
  let component: HighestRefListComponent;
  let fixture: ComponentFixture<HighestRefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestRefListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighestRefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
