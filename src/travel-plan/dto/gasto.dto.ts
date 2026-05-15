import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateGastoDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  descripcion: string;

  @IsNumber()
  @IsPositive()
  monto: number;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  categoria: string;
}
