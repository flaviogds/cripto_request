import {
  AfterViewInit,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { Coin, CoinList } from 'src/app/entity/coins-entity';
import { Currency } from 'src/app/entity/currency-entity';
import { TableModel } from '../entity/table-entity';
import { columnsToDisplay } from '../entity/table-enum';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'crip-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  columnsToDisplay: TableModel = {
    ...columnsToDisplay,
    list: () => [
      'id',
      'name',
      'price',
      'changes_1h',
      'changes_24h',
      'changes_7d',
      'changes_30d',
    ],
  };

  @Input()
  data$: Observable<CoinList> | undefined;

  @Input()
  currency$: Observable<Currency> | undefined;

  @Output()
  detailsId = new EventEmitter<string>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  currency: string | undefined;
  dataSource!: MatTableDataSource<Coin>;

  ngOnInit(): void {
    this.currency$?.subscribe((currency) => (this.currency = currency.code));

    this.data$?.subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  dialogDetails(id: any): void {
    this.detailsId.emit(id.toString());
  }

  mapProperty(property: any, ...args: string[]): any{
    let value = property;

    args.forEach(key =>  value = value[key]);

    return value;
  }

  include(key: string, ...args: string[]): boolean {
    return args.includes(key);
  }

  moduleOfNumber(num: number): number {
    return Math.abs(num);
  }

  getImage(id: any): string{
    return environment.imagUrl.concat(`${id}.png`);
  }
}
