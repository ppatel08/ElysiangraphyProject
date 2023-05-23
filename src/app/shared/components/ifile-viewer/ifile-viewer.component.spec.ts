import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IFileViewerComponent } from './ifile-viewer.component';

describe('IFileViewerComponent', () => {
  let component: IFileViewerComponent;
  let fixture: ComponentFixture<IFileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IFileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
