import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Meta } from '@angular/platform-browser';
import { TrackService } from './services/track.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bethel-expense-tracker-app';

  meta = inject(Meta);
  trackService = inject(TrackService);

  constructor() {
    this.meta.addTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
    this.meta.addTag({
      name: 'icon',
      content: 'image/x-icon',
      href: 'favicon.ico',
    });
    // this.meta.addTag({
    //   name: 'canonical',
    //   content: 'https://expense-tracker-app-manthanank.vercel.app/',
    // });
    this.meta.addTag({ property: 'og:title', content: 'Bethel - Expense Tracker App' });
    this.meta.addTag({ name: 'author', content: 'Mahesh Amirthalingam' });
    this.meta.addTag({
      name: 'keywords',
      content: 'angular, nodejs. express, mongodb',
    });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      property: 'og:description',
      content:
        'Bethel - Expense Tracker. It helps us to track apartments expenses. We can add, edit, delete, and filter our expenses.',
    });
    // this.meta.addTag({
    //   property: 'og:image',
    //   content: 'https://expense-tracker-app-manthanank.vercel.app/image.jpg',
    // });
    // this.meta.addTag({
    //   property: 'og:url',
    //   content: 'https://expense-tracker-app-manthanank.vercel.app/',
    // });
  }

  ngOnInit(): void {
    //this.trackService.trackProjectVisit(this.title);
  }
}
