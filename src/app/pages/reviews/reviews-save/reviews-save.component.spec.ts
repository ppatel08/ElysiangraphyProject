import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSaveComponent } from './reviews-save.component';

describe('ReviewsSaveComponent', () => {
  let component: ReviewsSaveComponent;
  let fixture: ComponentFixture<ReviewsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
