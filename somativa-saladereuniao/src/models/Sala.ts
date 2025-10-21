import mongoose, { Schema, model } from "mongoose";

export interface ISala {
  nome: string;
  capacidade: number;
  recursos: string[]; // Ex: ["Projetor", "Quadro Branco"]
}

const SalaSchema = new Schema<ISala>({
  nome: { type: String, required: true },
  capacidade: { type: Number, required: true },
  recursos: { type: [String], default: [] },
});

export const Sala = mongoose.models.Sala || model<ISala>("Sala", SalaSchema);
