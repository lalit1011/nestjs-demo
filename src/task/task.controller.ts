import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { } from './task-status.enum';
import { TaskService } from './task.service';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {

    }
    @Get()
    getTask(@Query() taskFilter: TaskFilterDto): Promise<Task[]> {
        return this.taskService.getTask(taskFilter);


    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.taskService.getTaskById(id);
    // }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {

        return this.taskService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusdto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusdto;
        return this.taskService.updateTaskStatus(id, status)
    }
}
