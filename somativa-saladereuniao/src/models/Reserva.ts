import mongoose, { Schema, model } from "mongoose";

export interface IReserva {
  sala: mongoose.Types.ObjectId;
  usuario: mongoose.Types.ObjectId;
  inicio: Date;
  fim: Date;
}

const ReservaSchema = new Schema<IReserva>({
  sala: { type: Schema.Types.ObjectId, ref: "Sala", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  inicio: { type: Date, required: true },
  fim: { type: Date, required: true },
});

// Index para ajudar na verificação de conflitos de reservas
ReservaSchema.index({ sala: 1, inicio: 1, fim: 1 }, { unique: false });

export const Reserva = mongoose.models.Reserva || model<IReserva>("Reserva", ReservaSchema);
