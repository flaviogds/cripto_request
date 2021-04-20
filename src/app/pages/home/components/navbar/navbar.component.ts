import { Component, Input } from '@angular/core';

@Component({
  selector: 'crip-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input()
  opened = false;

  toggle(): void {
    this.opened = !this.opened;
  }
}
