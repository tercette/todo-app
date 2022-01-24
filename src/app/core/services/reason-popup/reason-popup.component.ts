import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-reason-popup',
  templateUrl: './reason-popup.component.html',
  styleUrls: ['./reason-popup.component.scss']
})
export class ReasonPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogChat: MatDialogRef<ReasonPopupComponent>){ }

  ngOnInit() { }

  closeDialog(){
    this.dialogChat.close(false)
  }
}
