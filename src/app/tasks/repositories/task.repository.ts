import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/itask';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  constructor(private httpClient: HttpClient) {}

  create(task: ITask): Promise<ITask> {
    return this.httpClient
      .put<ITask>(`${environment.api}/tasks/${task.id}.json`, task)
      .toPromise();
  }

  update(task: ITask): Promise<ITask> {
    return this.httpClient
      .patch<ITask>(`${environment.api}/tasks/${task.id}.json`, task)
      .toPromise();
  }

  getById(id: string): Promise<ITask> {
    return this.httpClient
      .get<ITask>(`${environment.api}/tasks/${id}.json  `)
      .toPromise();
  }

  getAll(): Promise<ITask[]> {
    return this.httpClient
      .get<ITask[]>(`${environment.api}/tasks.json`)
      .toPromise();
  }

  async delete(id: string): Promise<void> {
    await this.httpClient
      .delete(`${environment.api}/tasks/${id}.json`)
      .toPromise();
    return;
  }
}
