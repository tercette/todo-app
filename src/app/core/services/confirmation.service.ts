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
      title: 'Attention',
      message: `Would you like to save/update this: <strong>${itemDetail}</strong>?`,
      okText: 'Delete/Edit',
      okColor: 'warn',
      cancelText: 'Cancel',
    };

    return this.show(data);
  }

  private show(data: IConfirmation): Observable<boolean> {
    const dialog = this.dialog.open(ConfirmationComponent, {
      data,
    });

    return dialog.afterClosed();
  }
}

