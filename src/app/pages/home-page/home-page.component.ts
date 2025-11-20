import { Component } from '@angular/core';
import { SectionGalleryComponent } from './components/section-gallery/section-gallery.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-home-page',
  imports: [
    SectionGalleryComponent,
    LoaderComponent,
    NavComponent,
    HomeBackgroundComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    FooterComponent,
    SectionGalleryComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
}
