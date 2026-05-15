import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Country } from 'src/country/country.schema';
import { Gasto, GastoSchema } from './gasto.schema';

export type TravelPlanDocument = HydratedDocument<TravelPlan>;
@Schema({ timestamps: true })
export class TravelPlan {
  @Prop({ required: true })
  titulo: string;
  @Prop({ required: true })
  fechaInicio: Date;
  @Prop({ required: true })
  fechaFin: Date;
  @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
  pais: Country;
  @Prop({ type: [GastoSchema], default: [] })
  gastos: Gasto[];
}
export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
