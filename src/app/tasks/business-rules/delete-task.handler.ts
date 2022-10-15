import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { MatDialog } from '@angular/material/dialog';
import { ReasonPopupComponent } from './../../core/services/reason-popup/reason-popup.component';
import { ReasonPopupService } from 'src/app/core/services/reason-popup.service';


@Injectable({
  providedIn: 'root',
})
export class DeleteTaskHandler {
  constructor(
    private repository: TaskRepository,
    private confirmation: ConfirmationService,
    private message: MatDialog,
    private reasonService: ReasonPopupService
  ) {}

  async execute(task: ITask): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmation
        .confirmDelete(`${task.id} - ${task.title}`)
        .subscribe(async (confirmed) => {
          if (confirmed) {
             this.reasonService
             .openReasonDialog('Please describe the reason')
             .afterClosed()
             .subscribe(async (res) => {
               if (res) {



                 await this.repository.delete(task.id);

                 resolve(confirmed);

               }
             })




          }
        });
    });
  }
}
