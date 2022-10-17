import { GetTasksHandler } from './../../business-rules/get-tasks.handler';
import { DeleteTaskHandler } from '../../business-rules/delete-task.handler';
import { ITask } from './../../models/itask';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';


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

  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
  }

  async getAllTasks(): Promise<void> {
    const tasks = await this.getTasksHandler.execute();
    if (tasks) {
      this.tasks = Object.values(tasks) ;
    } else {
      this.tasks = [];
    }
  }

  // deletando a tarefa da api
  async deleteTask(task: ITask): Promise<void> {
    // deletando a tarefa da api
    await this.deleteTaskHandler.execute(task );
    // removendo a tarefa do array de tarefas
    this.tasks.splice(this.tasks.indexOf(task), 1);
    // renderizando novamente as linhas da tabela para a tarefa que acabou
    // de ser excluída não apareça
    // com isso não preciso recarregar a tela novamente
    this.table?.renderRows();
  }

 }

