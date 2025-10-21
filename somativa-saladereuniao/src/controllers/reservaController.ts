import { NextApiRequest, NextApiResponse } from "next";
import { Reserva } from "../models/Reserva";

export const ReservaController = {
  // Listar reservas (por dia ou todas)
  async listar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const reservas = await Reserva.find({
        inicio: { $gte: hoje },
      }).populate("sala usuario");

      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar reservas", error });
    }
  },

  // Criar uma nova reserva
  async criar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { sala, usuario, inicio, fim } = req.body;

      // Validar conflitos
      const conflito = await Reserva.findOne({
        sala,
        $or: [
          { inicio: { $lt: new Date(fim), $gte: new Date(inicio) } },
          { fim: { $gt: new Date(inicio), $lte: new Date(fim) } },
          { inicio: { $lte: new Date(inicio) }, fim: { $gte: new Date(fim) } },
        ],
      });

      if (conflito) {
        return res.status(400).json({ message: "Sala já está reservada nesse horário" });
      }

      const novaReserva = new Reserva({ sala, usuario, inicio, fim });
      await novaReserva.save();
      const reservaPopulada = await novaReserva.populate("sala usuario");

      res.status(201).json(reservaPopulada);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar reserva", error });
    }
  },

  // Deletar reserva (Admin ou usuário dono)
  async deletar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      await Reserva.findByIdAndDelete(id as string);
      res.status(200).json({ message: "Reserva deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar reserva", error });
    }
  },
};
