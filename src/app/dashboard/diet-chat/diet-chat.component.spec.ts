import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietChatComponent } from './diet-chat.component';

describe('DietChatComponent', () => {
  let component: DietChatComponent;
  let fixture: ComponentFixture<DietChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
