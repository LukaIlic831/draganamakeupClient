import { Component } from '@angular/core';
import { SectionGalleryDesktopComponent } from './components/section-gallery-desktop/section-gallery-desktop.component';
import { SectionGalleryMobileComponent } from './components/section-gallery-mobile/section-gallery-mobile.component';

@Component({
  selector: 'app-section-gallery',
  imports: [SectionGalleryDesktopComponent, SectionGalleryMobileComponent],
  templateUrl: './section-gallery.component.html',
  styleUrl: './section-gallery.component.css',
})
export class SectionGalleryComponent {}
