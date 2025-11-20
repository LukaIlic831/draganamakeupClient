import { Component } from '@angular/core';
import { initReverseScrolling } from '../../../../../../scripts/reverse-scrolling';

@Component({
  selector: 'app-section-gallery-desktop',
  imports: [],
  templateUrl: './section-gallery-desktop.component.html',
  styleUrl: './section-gallery-desktop.component.css',
})
export class SectionGalleryDesktopComponent {
  ngAfterViewInit() {
    initReverseScrolling();
  }
}
