import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true, timestamps: true })
export class Gasto {
  @Prop({ required: true })
  descripcion: string;
  @Prop({ required: true })
  monto: number;
  @Prop({ required: true })
  categoria: string;
}
export const GastoSchema = SchemaFactory.createForClass(Gasto);