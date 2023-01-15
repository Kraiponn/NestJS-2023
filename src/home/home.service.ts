import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly service: PrismaService) {}

  /*************************************************************
   *                      Find Many Home
   ************************************************************/
  async findAll() {
    return await this.service.home.findMany();
  }

  /*************************************************************
   *                    Find A Single Home
   ************************************************************/
  async findById() {
    return {};
  }

  /*************************************************************
   *                      Create Home
   ************************************************************/
  async create() {
    return {};
  }

  /*************************************************************
   *                      Update Home
   ************************************************************/
  async update() {
    return {};
  }

  /*************************************************************
   *                      Remove a Home
   ************************************************************/
  async remove() {
    return {};
  }
}
