import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';

@Injectable({
  providedIn: 'root',
})
export class GetTasksHandler {
  constructor(private repository: TaskRepository) {}

  async execute(): Promise<ITask[] | undefined> {
    try {
      const response = await this.repository.getAll();
      return response;
    } catch (error) {
      alert('Erro ao buscar todas tarefas');
      return undefined;
    }
  }
}
