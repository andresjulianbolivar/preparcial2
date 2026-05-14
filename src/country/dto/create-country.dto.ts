import { IsString, Length, IsUrl, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCountryDto {
  @IsString()
  @Length(3, 3)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  _id: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  capital: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  region: string;

  @IsNumber()
  poblacion: number;

  @IsUrl()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  urlBandera: string;
}
