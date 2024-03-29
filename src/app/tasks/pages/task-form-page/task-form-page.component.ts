import { ITask } from './../../models/itask';
import { GetTaskHandler } from './../../business-rules/get-task.handler';
import { UpdateTaskHandler } from './../../business-rules/update-task.handler';
import { CreateTaskHandler } from './../../business-rules/create-task.handler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export class TaskFormPageComponent implements OnInit {
  pageTitle = 'Nuovo compito';

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
    private getTaskHandler: GetTaskHandler,
    private router: Router
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
      this.pageTitle = 'Attività di modifica';
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
    };

    if (location.pathname.includes('edit')) {
      const id = this.activatedRouter.snapshot.paramMap.get('id');

      await this.updateTaskHandler.execute({ ...taskToSave, id })
      this.router.navigate([''])
    } else {
      await this.createTaskHandler.execute({
        ...taskToSave,
        id: new Date().getTime().toString().slice(10),
      });
    }
  }
}
