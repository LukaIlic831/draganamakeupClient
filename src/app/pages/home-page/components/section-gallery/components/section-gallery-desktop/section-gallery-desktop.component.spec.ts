import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGalleryDesktopComponent } from './section-gallery-desktop.component';

describe('SectionGalleryDesktopComponent', () => {
  let component: SectionGalleryDesktopComponent;
  let fixture: ComponentFixture<SectionGalleryDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionGalleryDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionGalleryDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
