import { Component } from '@angular/core';

interface Page {
  name: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  pages: Page[] = [
    {
      name: 'Home',
      route: 'home',
    },
    {
      name: 'About',
      route: 'about',
    },
    {
      name: 'Contribute',
      route: 'contribute',
    },
  ];
}
