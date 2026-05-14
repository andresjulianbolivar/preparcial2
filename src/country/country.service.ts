import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.schema';
import { ApiExternalProvider } from './apiExternal.provider';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
    private readonly apiExternalProvider: ApiExternalProvider,
  ) {}
}
