import { ITask } from './../../models/itask';
import { GetTaskHandler } from './../../business-rules/get-task.handler';
import { UpdateTaskHandler } from './../../business-rules/update-task.handler';
import { CreateTaskHandler } from './../../business-rules/create-task.handler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export class TaskFormPageComponent implements OnInit {
  pageTitle = 'Nova tarefa';

  // configuração do formulário
  form = this.formBuild.group({
    title: [''],
    description: [''],
    done: [false],
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  get done(): FormControl {
    return this.form.get('done') as FormControl;
  }

  taskId: string | undefined = undefined;

  constructor(
    private formBuild: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private createTaskHandler: CreateTaskHandler,
    private updateTaskHandler: UpdateTaskHandler,
    private getTaskHandler: GetTaskHandler
  ) {}

  async ngOnInit(): Promise<void> {
    const paramId = this.activatedRouter.snapshot.paramMap.get('id');
    if (paramId) {
      this.taskId = paramId;
      await this.loadTask();
    }
  }

  async loadTask(): Promise<void> {
    const response = await this.getTaskHandler.execute(this.taskId || '');
    if (response) {
      this.pageTitle = 'Editando tarefa';
      // atualizando o formulário com os valores retornados pela api
      this.form.patchValue({
        title: response.title,
        description: response.description,
        done: response.done,
      });
    }
  }

  async onSubmit(): Promise<void> {
    const taskToSave: ITask = {
      ...this.form.value, // pegando todos os valores do formulário
      id: this.taskId, // atualizando o id caso exista
    };
    let response: ITask | undefined;

    if (taskToSave.id) {
      response = await this.updateTaskHandler.execute(taskToSave);
    } else {
      response = await this.createTaskHandler.execute(taskToSave);
    }

    if (response) {
      this.taskId = response.id;
    }
  }
}
