import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSaveComponent } from './images-save.component';

describe('ImagesSaveComponent', () => {
  let component: ImagesSaveComponent;
  let fixture: ComponentFixture<ImagesSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
