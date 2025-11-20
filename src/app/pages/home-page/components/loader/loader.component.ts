import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit {
  hide = false;
  remove = false;

  ngOnInit() {
    setTimeout(() => {
      this.hide = true;
    }, 3000);
    setTimeout(() => {
      this.remove = true;
    }, 3500);
  }
}
