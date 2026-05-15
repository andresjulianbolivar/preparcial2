import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanDocument } from './travel-plan.schema';
import { Model } from 'mongoose';
import { CountryService } from 'src/country/country.service';
import { UserService } from 'src/user/user.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateGastoDto } from './dto/gasto.dto';

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectModel(TravelPlan.name)
    private readonly travelPlanModel: Model<TravelPlanDocument>,
    private readonly countryService: CountryService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTravelPlanDto) {
    const country = await this.countryService.findByCode(dto.pais);
    if (!country) {
      throw new NotFoundException(`Country with code ${dto.pais} not found`);
    }
    const user = await this.userService.findById(dto.usuario);
    if (!user) {
      throw new NotFoundException(`User with id ${dto.usuario} not found`);
    }
    const created = await this.travelPlanModel.create(dto);
    return created;
  }

  async addGasto(id: string, dto: CreateGastoDto) {
    const travelPlan = await this.travelPlanModel.findById(id).exec();
    if (!travelPlan) {
      throw new NotFoundException(`Travel plan with id ${id} not found`);
    }
    const updated = await this.travelPlanModel
      .findByIdAndUpdate(id, { $push: { gastos: dto } }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Travel plan with id ${id} not found`);
    }
    return updated;
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
