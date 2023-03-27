import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {

    }
    @Get()
    getAllTask(): Task[] {
        return this.taskService.getAllTask();
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
