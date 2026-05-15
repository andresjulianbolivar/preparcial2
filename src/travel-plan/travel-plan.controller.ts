import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateGastoDto } from './dto/gasto.dto';

@Controller('travel-plans')
export class TravelPlanController {
  constructor(private readonly service: TravelPlanService) {}

  @Post()
  create(@Body() body: CreateTravelPlanDto) {
    return this.service.create(body);
  }

  @Post(':_id/expenses')
  addGasto(@Param('_id') id: string, @Body() body: CreateGastoDto) {
    return this.service.addGasto(id, body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':_id')
  remove(@Param('_id') id: string) {
    return this.service.remove(id);
  }
}
