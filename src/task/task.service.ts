import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository, } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async getTask(filterDto: TaskFilterDto): Promise<Task[]> {
        return Task.getTasks(filterDto)
    }


    async getTaskById(id: string): Promise<Task> {

        const found = await this.taskRepository.findOne({
            where: {
                id
            },
        });
        if (!found) {
            throw new NotFoundException(`Task id ${id} not found`);
        }

        return found;
    }

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({ title, description });

        await this.taskRepository.save(task);

        return task;
    }

    async deleteTask(id): Promise<void> {

        const result = this.taskRepository.delete(id);
        if ((await result).affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

    }

    async updateTaskStatus(id, status): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;

        await this.taskRepository.save(task);

        return task;
    }
}
