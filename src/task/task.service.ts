import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {

    private tasks: Task[] = [];

    getAllTask(): Task[] {
        return this.tasks;
    }
    getTaskById(id): Task {
        return this.tasks.find(t => id === t.id);
    }
    createTask(createTaskDto: createTaskDto): Task {
        const { title, description } = createTaskDto;
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);

        return task;
    }

    deleteTask(id): void {
        this.tasks.filter(t => t.id !== id);
    }
}
