import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { CreateCountryDto } from './dto/create-country.dto';

interface CountryResponse {
  cca3: string;
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

@Injectable()
export class ApiExternalProvider {
  constructor(private readonly httpService: HttpService) {}

  async getCountry(code: string) {
    const response = await firstValueFrom(
      this.httpService.get<CountryResponse[]>(
        `https://restcountries.com/v3.1/alpha/${code}`,
      ),
    );

    const country = response.data[0];

    return plainToInstance(CreateCountryDto, {
      _id: country.cca3,
      nombre: country.name.common,
      capital: country.capital[0],
      region: country.region,
      poblacion: country.population,
      urlBandera: country.flags.png,
    });
  }
}
