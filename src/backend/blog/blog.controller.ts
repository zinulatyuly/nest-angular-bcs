import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {

  constructor(private blogService: BlogService) { }

  @Get('tasks')
  async getTasks(@Res() res) {
    const tasks = await this.blogService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('tasks/:taskID')
  async getTask(@Res() res, @Param('taskID', new ValidateObjectId()) taskID) {
    const task = await this.blogService.getTask(taskID);
    if (!task) { throw new NotFoundException('Task does not exist!'); }
    return res.status(HttpStatus.OK).json(task);
  }

  @Post('/tasks')
  async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
    const newTask = await this.blogService.addTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been submitted successfully!',
      task: newTask,
    });
  }

  @Put('/tasks/:taskID')
  async editTask(
    @Res() res,
    @Param('taskID', new ValidateObjectId()) taskID,
    @Body() createTaskDTO: CreateTaskDTO,
  ) {
    const editedTask = await this.blogService.editTask(taskID, createTaskDTO);
    if (!editedTask) { throw new NotFoundException('Task does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'Task has been successfully updated',
      task: editedTask,
    });
  }

  @Delete('/tasks/:taskID')
  async deleteTask(@Res() res, @Param('taskID', new ValidateObjectId()) taskID) {
    const deletedTask = await this.blogService.deleteTask(taskID);
    if (!deletedTask) { throw new NotFoundException('Task does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'Task has been deleted!',
      task: deletedTask,
    });
  }
}
