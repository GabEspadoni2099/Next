import { NextApiRequest, NextApiResponse } from "next";
import { Sala } from "../models/Sala";

export const SalaController = {
  // Listar todas as salas
  async listar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const salas = await Sala.find();
      res.status(200).json(salas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar salas", error });
    }
  },

  // Criar uma nova sala (Admin)
  async criar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { nome, capacidade, recursos } = req.body;
      const novaSala = new Sala({ nome, capacidade, recursos });
      await novaSala.save();
      res.status(201).json(novaSala);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar sala", error });
    }
  },

  // Atualizar uma sala (Admin)
  async atualizar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const { nome, capacidade, recursos } = req.body;
      const salaAtualizada = await Sala.findByIdAndUpdate(
        id,
        { nome, capacidade, recursos },
        { new: true }
      );
      res.status(200).json(salaAtualizada);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar sala", error });
    }
  },

  // Deletar uma sala (Admin)
  async deletar(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      await Sala.findByIdAndDelete(id as string);
      res.status(200).json({ message: "Sala deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar sala", error });
    }
  },
};
