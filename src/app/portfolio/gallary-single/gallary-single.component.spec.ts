import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallarySingleComponent } from './gallary-single.component';

describe('GallarySingleComponent', () => {
  let component: GallarySingleComponent;
  let fixture: ComponentFixture<GallarySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallarySingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallarySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
