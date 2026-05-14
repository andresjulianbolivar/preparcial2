import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './country.schema';
import { CountryService } from './country.service';
import { ApiExternalProvider } from './apiExternal.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountryService, ApiExternalProvider],
})
export class CountryModule {}
