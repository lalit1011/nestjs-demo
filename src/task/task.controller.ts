import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {

    }
    @Get()
    getTask(@Query() taskFilter: TaskFilterDto): Task[] {
        if (Object.keys(taskFilter).length) {
            return this.taskService.getTasksWithFilter(taskFilter);
        } else {
            return this.taskService.getAllTask();
        }

    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {

        return this.taskService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusdto: UpdateTaskStatusDto): Task {
        const { status } = updateTaskStatusdto;
        return this.taskService.updateTaskStatus(id, status)
    }
}
