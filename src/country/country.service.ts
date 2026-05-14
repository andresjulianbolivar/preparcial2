import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.schema';
import { ApiExternalProvider } from './apiExternal.provider';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
    private readonly apiExternalProvider: ApiExternalProvider,
  ) {}

  async create(dto: CreateCountryDto) {
    const created = await this.countryModel.create(dto);
    return created;
  }

  async findByCode(code: string) {
    let country = await this.countryModel.findById(code).exec();
    console.log(await this.countryModel.find().lean());
    if (!country) {
      const newCountry = await this.apiExternalProvider.getCountry(code);
      country = await this.create(newCountry);
    }
    return country;
  }
}
