import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/entity/entity';

@Component({
  selector: 'crip-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() dataSource: any | undefined;

  displayedColumns: string[] = ['id', 'name', 'description'];
}
