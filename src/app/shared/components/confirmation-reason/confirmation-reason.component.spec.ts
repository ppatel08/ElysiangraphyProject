import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReasonComponent } from './confirmation-reason.component';

describe('ConfirmationReasonComponent', () => {
  let component: ConfirmationReasonComponent;
  let fixture: ComponentFixture<ConfirmationReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
