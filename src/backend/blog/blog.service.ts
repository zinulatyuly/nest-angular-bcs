import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class BlogService {

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getTask(taskID): Promise<Task> {
    return await this.taskModel
      .findById(taskID)
      .exec();
  }

  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = await this.taskModel(createTaskDTO);
    return newTask.save();
  }

  async editTask(taskID, createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(taskID, createTaskDTO, { new: true });
  }

  async deleteTask(taskID): Promise<any> {
    return await this.taskModel.findByIdAndRemove(taskID);
  }

}