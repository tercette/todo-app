import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';

@Injectable({
  providedIn: 'root',
})
export class GetTaskHandler {
  constructor(private repository: TaskRepository) {}

  async execute(id: string): Promise<ITask | undefined> {
    try {
      if (id) {
        const response = await this.repository.getById(id);
        return response;
      } else {
        throw new Error('O identificador da tarefa não é valido.');
      }
    } catch (error) {
      alert('Erro ao buscar uma tarefa');
      return undefined;
    }
  }
}
