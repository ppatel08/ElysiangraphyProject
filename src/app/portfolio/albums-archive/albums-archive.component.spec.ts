import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsArchiveComponent } from './albums-archive.component';

describe('AlbumsArchiveComponent', () => {
  let component: AlbumsArchiveComponent;
  let fixture: ComponentFixture<AlbumsArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
