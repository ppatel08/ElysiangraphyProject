import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsSaveComponent } from './albums-save.component';

describe('AlbumsSaveComponent', () => {
  let component: AlbumsSaveComponent;
  let fixture: ComponentFixture<AlbumsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
