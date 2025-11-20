import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  scrollToSection(event: Event) {
    event.preventDefault();
    const linkElement = event.target as HTMLAnchorElement;
    const section = document.getElementById(linkElement.href.split('#')[1]);
    section?.scrollIntoView({ block: 'start' });
  }
}
