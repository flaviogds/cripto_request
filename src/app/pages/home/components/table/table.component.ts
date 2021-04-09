import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coin, CoinList } from 'src/app/entity/entity';
import * as homeSelectors from '../../state/home.selectors'

@Component({
  selector: 'crip-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  columnsToDisplay = ['id', 'name', 'price', 'last hour', 'today', 'last week', 'last month'];
  dataSource: MatTableDataSource<Coin>;

  response$: Observable<CoinList> | undefined;
  data: Coin[] | undefined;
  currency: string | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store){
    this.response$ = this.store.pipe(select(homeSelectors.selectResponse));
    this.response$.subscribe(response => {
      this.data = response.data;
      this.currency = response.status.currency;
    });

    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
