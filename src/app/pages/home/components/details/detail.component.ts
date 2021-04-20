import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coin } from 'src/app/entity/coins-entity';

@Component({
  selector: 'crip-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Coin
  ) {}

  ngOnInit(): void {
    if (this.data.details?.id === undefined) {
      this.dialogRef.close();
    }
  }
}
