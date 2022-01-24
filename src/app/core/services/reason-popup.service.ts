import { ReasonPopupComponent } from './reason-popup/reason-popup.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ReasonPopupService {

  constructor(private messageDialog: MatDialog) { }

  openReasonDialog(msg:string){
    return this.messageDialog.open(ReasonPopupComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : { message:msg }
    });
  }
}
