import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>,
  ) {}
  create(
    codigo: string,
    nombre: string,
    capital: string,
    region: string,
    poblacion: number,
    urlBandera: string,
  ) {
    return this.countryModel.create({
      codigo: codigo,
      nombre: nombre,
      capital: capital,
      region: region,
      poblacion: poblacion,
      urlBandera: urlBandera,
    });
  }
  async findOne(code: string) {
    const country = await this.countryModel
      .findById(code)
      .select('_id nombre capital region poblacion urlBandera')
      .exec();
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }
}
