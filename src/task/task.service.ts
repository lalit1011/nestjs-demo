import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TaskService {

    private tasks: Task[] = [];

    getTasksWithFilter(filterDto: TaskFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTask();

        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.includes(search) || task.title.includes(search)) {
                    return true;
                }
                return false;
            });
        }
        return tasks;
    }

    getAllTask(): Task[] {
        return this.tasks;
    }
    getTaskById(id): Task {
        const found = this.tasks.find(t => id === t.id);
        if (!found) {
            throw new NotFoundException(`Task id ${id} not found.`);
        }
        return found;
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

        this.tasks = this.tasks.filter(t => t.id != id);

    }

    updateTaskStatus(id, status): Task {
        const index = this.tasks.findIndex(t => t.id === id);
        const tasks = [...this.tasks];
        tasks[index].status = status;
        this.tasks[index] = tasks[index];
        return this.tasks[index]
    }
}
