import { Module } from '@nestjs/common';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [CountryModule],
  controllers: [TravelPlanController],
  providers: [TravelPlanService],
})
export class TravelPlanModule {}
