import mongoose, { Schema, model } from "mongoose";

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
  role: "admin" | "user";
}

const UsuarioSchema = new Schema<IUsuario>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const Usuario = mongoose.models.Usuario || model<IUsuario>("Usuario", UsuarioSchema);
