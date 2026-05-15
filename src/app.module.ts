import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelPlanModule } from './travel-plan/travel-plan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AccessLogMiddleware } from './common/middleware/access-log.middleware';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/nest_persistencia?authSource=admin',
    ),
    CountryModule,
    TravelPlanModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
