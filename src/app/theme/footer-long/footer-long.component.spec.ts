import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLongComponent } from './footer-long.component';

describe('FooterLongComponent', () => {
  let component: FooterLongComponent;
  let fixture: ComponentFixture<FooterLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterLongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
