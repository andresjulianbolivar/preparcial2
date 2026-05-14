import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;
@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true })
  //Este es el codigo alpha-3 del pais
  _id: string;
  @Prop({ required: true })
  nombre: string;
  @Prop({ required: true })
  capital: string;
  @Prop({ required: true })
  region: string;
  @Prop({ required: true })
  poblacion: number;
  @Prop({ required: true })
  urlBandera: string;
}
export const CountrySchema = SchemaFactory.createForClass(Country);
