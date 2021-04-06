import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'crip-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {

  color: ThemePalette = 'dark';
  mode: ProgressBarMode = 'query';
  value = 10;
  bufferValue = 10;
}
