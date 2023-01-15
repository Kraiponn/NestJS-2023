import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  /*************************************************************************
   * @Describtion     Get All Home
   * @Route           GET /home
   * @Access          Public
   */
  @Get()
  async getHomes() {
    return await this.homeService.findAll();
  }

  /*************************************************************************
   * @Describtion     Get a Single Home
   * @Route           GET /home/:homeId
   * @Access          Public
   */
  @Get(':homeId')
  async getHome(@Param('homeId', ParseIntPipe) homeId: number) {
    return await this.homeService.findById();
  }

  /*************************************************************************
   * @Describtion     Create Home
   * @Route           POST /home
   * @Access          Public
   */
  @Post()
  async createHome() {
    return await this.homeService.create();
  }

  /*************************************************************************
   * @Describtion     Update Home
   * @Route           PUT /home/:homeId
   * @Access          Public
   */
  @Put(':homeId')
  async updateHome(@Param('homeId', ParseIntPipe) homeId: number) {
    return await this.homeService.update();
  }

  /*************************************************************************
   * @Describtion     Remove Home
   * @Route           DELETE /home/:homeId
   * @Access          Public
   */
  @Delete(':homeId')
  async deleteHome(@Param('homeId', ParseIntPipe) homeId: number) {
    return await this.homeService.remove();
  }
}
