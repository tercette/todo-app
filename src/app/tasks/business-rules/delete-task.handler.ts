import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { DialogService } from '../shared/Services/dialog.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskHandler {
  constructor(
    private repository: TaskRepository,
    private confirmation: ConfirmationService,
    private dialog: DialogService
  ) {}

  async execute(task: ITask): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmation
        .confirmDelete(`${task.id} - ${task.title}`)
        .subscribe(async (confirmed) => {
          if (confirmed) {
            await this.repository.delete(task.id);
            this.dialog
              .openConfirmDialog('Are you really want to delete/update/create?')
              .afterClosed();
          } 
          resolve(confirmed) ;
        });
    });
  }
}
