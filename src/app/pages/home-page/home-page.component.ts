import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initReverseScrolling } from '../../scripts/reverse-scrolling';
import { SectionGalleryComponent } from './components/section-gallery/section-gallery.component';
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CommonModule, SectionGalleryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  currentYear = new Date().getFullYear();
  hide = false;
  remove = false;
  scrollToSection(event: Event) {
    event.preventDefault();
    const linkElement = event.target as HTMLAnchorElement;
    const section = document.getElementById(linkElement.href.split('#')[1]);
    section?.scrollIntoView({ block: 'start' });
  }

  ngAfterViewInit() {
    initReverseScrolling();
  }

  ngOnInit() {
    setTimeout(() => {
      this.hide = true;
    }, 3000);
    setTimeout(() => {
      this.remove = true;
    }, 3500);
  }
}
