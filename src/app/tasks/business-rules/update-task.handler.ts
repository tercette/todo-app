import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskHandler {
  constructor(private repository: TaskRepository) {}

  async execute(task: ITask): Promise<ITask | undefined> {
    try {
      const response = await this.repository.update(task);
      alert('Tarefa alterada com sucesso.');

      return response;
    } catch (error) {
      alert('Erro ao alterar a tarefa');
      return undefined;
    }
  }
}
