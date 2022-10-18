import { TaskRepository } from './../repositories/task.repository';
import { Injectable } from '@angular/core';
import { ITask } from '../models/itask';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskHandler {
  constructor(
    private repository: TaskRepository,
    private confirmation: ConfirmationService,
    private router: Router
  ) {}

  async execute(task: ITask): Promise<ITask | undefined> {
    try {
      const response = await this.repository.create(task);
      this.confirmation.confirmSave('File created !').subscribe ( res => {
        if (res) {
          this.router.navigate([''])
        }
      });
      return response;
    } catch (error) {
      alert('Erro ao criar a tarefa');
      return undefined;
    }
  }
}
