import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanDocument } from './travel-plan.schema';
import { Model } from 'mongoose';
import { CountryService } from 'src/country/country.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectModel(TravelPlan.name)
    private readonly travelPlanModel: Model<TravelPlanDocument>,
    private readonly countryService: CountryService,
  ) {}

  async create(dto: CreateTravelPlanDto) {
    const country = await this.countryService.findByCode(dto.pais);
    if (!country) {
      throw new NotFoundException(`Country with code ${dto.pais} not found`);
    }
    const created = await this.travelPlanModel.create(dto);
    return created;
  }

  async findAll() {
    return this.travelPlanModel.find().exec();
  }

  async findOne(id: string) {
    const travelPlan = await this.travelPlanModel
      .findById(id)
      .populate('pais')
      .exec();
    if (!travelPlan) {
      throw new NotFoundException(`Travel plan with id ${id} not found`);
    }
    return travelPlan;
  }

  async remove(id: string) {
    const result = await this.travelPlanModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Travel plan with id ${id} not found`);
    }
    return result;
  }
}
