import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusSaveComponent } from './aboutus-save.component';

describe('AboutusSaveComponent', () => {
  let component: AboutusSaveComponent;
  let fixture: ComponentFixture<AboutusSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
