import { IsString, Length, IsUrl, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCountryDto {
  @IsString()
  @Length(3, 3)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  _id: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  capital: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  region: string;

  @IsNumber()
  @IsPositive()
  poblacion: number;

  @IsUrl()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  urlBandera: string;
}
