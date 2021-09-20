import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { DialogService } from '../shared/Services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskHandler {
  constructor(
    private repository: TaskRepository,
    private dialogService: DialogService
  ) {}

  async execute(task: ITask): Promise<boolean> {
    return new Promise((resolve) => {
      this.dialogService
        .openConfirmDialog(`${task.id} - ${task.title}`)
        .subscribe(async (confirmed) => {
          if (confirmed) {
            await this.repository.update(put(task.id));
            this.dialogService
              .openConfirmDialog('Are you really want to delete/update/create?')
              .afterClosed();
          }
          resolve(confirmed);
        });
    });
  }
}
