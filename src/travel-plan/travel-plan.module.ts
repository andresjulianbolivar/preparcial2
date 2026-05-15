import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from 'src/country/country.module';
import { TravelPlan, TravelPlanSchema } from './travel-plan.schema';
import { TravelPlanController } from './travel-plan.controller';
import { TravelPlanService } from './travel-plan.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelPlan.name, schema: TravelPlanSchema },
    ]),
    CountryModule,
    UserModule,
  ],
  controllers: [TravelPlanController],
  providers: [TravelPlanService],
})
export class TravelPlanModule {}
