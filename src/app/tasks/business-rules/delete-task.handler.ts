import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskHandler {
  constructor(private repository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
      alert('Tarefa excluída com sucesso.');
    } catch (error) {
      alert('Erro ao excluir a tarefa');
      return undefined;
    }
  }
}
