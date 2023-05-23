import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFeedbackLinkComponent } from './send-feedback-link.component';

describe('SendFeedbackLinkComponent', () => {
  let component: SendFeedbackLinkComponent;
  let fixture: ComponentFixture<SendFeedbackLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendFeedbackLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFeedbackLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
