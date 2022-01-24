import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskHandler {
  constructor(
    private repository: TaskRepository,
    private confirmation: ConfirmationService
  ) {}

  async execute(task: ITask): Promise<ITask | undefined> {
    try {
      const response = await this.repository.create(task);
      /* alert('Tarefa criada com sucesso.'); */
      this.confirmation.confirmSave('File created !');
      return response;
    } catch (error) {
      alert('Erro ao criar a tarefa');
      return undefined;
    }
  }
}
