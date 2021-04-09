import { Component } from '@angular/core';

@Component({
  selector: 'crip-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  opened = false;

  toggle(): void{
    this.opened = !this.opened;
  }
}
