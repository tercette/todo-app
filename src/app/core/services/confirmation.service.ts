import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from './confirmation.component';
import { IConfirmation } from './iconfirmation';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  confirmDelete(itemDetail: string): Observable<boolean> {
    const data: IConfirmation = {
      title: 'Attenzione',
      message: `<strong>Vorresti eliminare questo titolo: <strong>${itemDetail}</strong>?`,
      okText: 'Elimina',
      okColor: 'warn',
      cancelText: 'Annula',
      panelClass: 'confirm-dialog-container',
    };

    return this.show(data);
  }

  private show(data: IConfirmation): Observable<boolean> {
    const dialog = this.dialog.open(ConfirmationComponent, {
      data,
    });

    return dialog.afterClosed();
  }


  confirmSave(itemDetail: string): Observable<boolean> {
    const data: IConfirmation = {
      title: 'Attention',
      message: `<strong>Vuoi salvare?</strong>`,
      okText: 'Salvare',
      okColor: 'warn',
      cancelText: 'Annula',
      panelClass: 'confirm-dialog-container'
    };
      return this.show(data);
    };
}

