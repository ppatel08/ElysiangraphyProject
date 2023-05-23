import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusSaveComponent } from './contactus-save.component';

describe('ContactusSaveComponent', () => {
  let component: ContactusSaveComponent;
  let fixture: ComponentFixture<ContactusSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
