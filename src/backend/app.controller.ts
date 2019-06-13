import { Get, Controller, Param, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('images/:folder/:image')
  getImage(@Param('folder') folder, @Param('image') image, @Res() res) {
    res.sendFile(image, { root: `public/images/${folder}`});
  }
}
