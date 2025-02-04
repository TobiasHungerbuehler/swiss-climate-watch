import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitelsComponent } from './titels.component';

describe('TitelsComponent', () => {
  let component: TitelsComponent;
  let fixture: ComponentFixture<TitelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
