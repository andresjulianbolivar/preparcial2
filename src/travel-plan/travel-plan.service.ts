import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TravelPlan, TravelPlanDocument } from './travel-plan.schema';
import { Model } from 'mongoose';
import { CountryService } from 'src/country/country.service';

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectModel(TravelPlan.name)
    private readonly travelPlanModel: Model<TravelPlanDocument>,
    private readonly countryService: CountryService,
  ) {}
}
