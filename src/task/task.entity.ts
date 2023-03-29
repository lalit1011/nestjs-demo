import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { TaskFilterDto } from './dto/task-filter.dto';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default: TaskStatus.OPEN
    })
    status: TaskStatus;

    static async getTasks(taskFilter: TaskFilterDto) {
        const { status, search } = taskFilter;

        const query = this.createQueryBuilder("task");

        if (status) {
            query.where('task.status = :status', { status: status });
        }

        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }
        return await query.getMany();
    }
}