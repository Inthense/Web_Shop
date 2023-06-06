import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navigation-bar></app-navigation-bar>
  <router-outlet></router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {
  title = 'Web_Shop';
}
