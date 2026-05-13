import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from 'src/country/country.module';
import { TravelPlan, TravelPlanSchema } from './travel-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelPlan.name, schema: TravelPlanSchema },
    ]),
    CountryModule,
  ],
})
export class TravelPlanModule {}
