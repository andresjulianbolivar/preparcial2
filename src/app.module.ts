import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelPlanModule } from './travel-plan/travel-plan.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/nest_persistencia?authSource=admin'
    ),
    CountryModule,
    TravelPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
