import { IsString, Length, IsDate, IsNotEmpty } from 'class-validator';
import { Transform, Type, Expose } from 'class-transformer';

export class CreateTravelPlanDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  titulo: string;

  @IsDate()
  @Type(() => Date)
  @Expose({ name: 'fecha_inicio' })
  fechaInicio: Date;

  @IsDate()
  @Type(() => Date)
  @Expose({ name: 'fecha_fin' })
  fechaFin: Date;

  @IsString()
  @Length(3, 3)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  pais: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;
}
