import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskHandler {
  constructor(
    private repository: TaskRepository,
    private confirmation: ConfirmationService,
  ) { }

  async execute(task: ITask): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmation
        .confirmDelete(`${task.title}`)
        .subscribe(async (confirmed) => {
          if (confirmed) {
            await this.repository.delete(task.id);
            resolve(confirmed);
          }
        });
    });
  }
}
