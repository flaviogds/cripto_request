import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coin } from 'src/app/entity/entity';

@Component({
  selector: 'crip-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Coin
  ){}

  ngOnInit(): void{
    if (this.data.details?.id === undefined){
      this.dialogRef.close();
    }
  }
}
