import { GetTasksHandler } from './../../business-rules/get-tasks.handler';
import { DeleteTaskHandler } from '../../business-rules/delete-task.handler';
import { ITask } from './../../models/itask';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DialogService } from '../../shared/Services/dialog.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskListPageComponent implements OnInit {
  // Recuperando o elemento "<table></table>" da tela
  // Porem aqui o componente de tabela é do angular material,
  // Com isso eu uso o tipo MatTable
  @ViewChild(MatTable) table: MatTable<ITask> | undefined;

  tasks: ITask[] = [];
  displayedColumns = ['id', 'title', 'description', 'done', 'action'];

  constructor(
    private getTasksHandler: GetTasksHandler,
    private deleteTaskHandler: DeleteTaskHandler,
    private dialogService: DialogService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
  }

  async getAllTasks(): Promise<void> {
    const tasks = await this.getTasksHandler.execute();
    if (tasks) {
      this.tasks = tasks;
    } else {
      this.tasks = [];
    }
  }

  // deletando a tarefa da api
  async deleteTask(task: ITask): Promise<void> {
    // removendo a tarefa do array de tarefas
    this.dialogService
    .openConfirmDialog('Are you really want to delete?')
    .afterClosed()
    .subscribe(async (res) => {
      if (res) {
    await this.deleteTaskHandler.execute(task.id || '');
          this.tasks.splice(this.tasks.indexOf(task), 1);
          // renderizando novamente as linhas da tabela para a tarefa que acabou
          // de ser excluída não apareça
          this.table?.renderRows();
        }});

  }
}
