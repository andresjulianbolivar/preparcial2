import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { TravelsPlanModule } from './travels-plan/travels-plan.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';

@Module({
  imports: [CountriesModule, TravelsPlanModule, TravelPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
