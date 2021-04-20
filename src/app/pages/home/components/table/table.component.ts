import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { Coin, CoinList } from 'src/app/entity/entity';
import { Currency } from 'src/app/entity/currency';

interface TableModel {
  id: string;
  name: string;
  price: string;
  changes_1h: string;
  changes_24h: string;
  changes_7d: string;
  changes_30d: string;
  list: () => string[];
}

@Component({
  selector: 'crip-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  columnsToDisplay: TableModel = {
    id: '#',
    name: 'Name',
    price: 'Price Now',
    changes_1h: 'Last Hour (%)',
    changes_24h: 'Today (%)',
    changes_7d: 'Last Week (%)',
    changes_30d: 'Last Month (%)',
    list: () => (['id', 'name', 'price', 'changes_1h', 'changes_24h', 'changes_7d', 'changes_30d'])
  };

  dataSource: MatTableDataSource<Coin> | undefined;

  @Input()
  data$: Observable<CoinList> | undefined;

  @Input()
  currency$: Observable<Currency> | undefined;

  @Output()
  detailsId = new EventEmitter<string>();

  currency: string | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void{
    this.currency$?.subscribe(currency => this.currency = currency.code);

    this.data$?.subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    if (this.dataSource){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  dialogDetails(id: any): void{
    this.detailsId.emit(id.toString());
  }

  include(key: string, ...args: string[]): boolean{
    return args.includes(key);
  }

  moduleOfNumber(num: number): number{
    return Math.abs(num);
  }
}
