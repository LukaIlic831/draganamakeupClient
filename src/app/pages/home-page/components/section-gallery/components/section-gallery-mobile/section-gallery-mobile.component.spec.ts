import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGalleryMobileComponent } from './section-gallery-mobile.component';

describe('SectionGalleryMobileComponent', () => {
  let component: SectionGalleryMobileComponent;
  let fixture: ComponentFixture<SectionGalleryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionGalleryMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionGalleryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
