import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupPopupGridComponent } from './checkup-popup-grid.component';

describe('CheckupPopupGridComponent', () => {
  let component: CheckupPopupGridComponent;
  let fixture: ComponentFixture<CheckupPopupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckupPopupGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckupPopupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
