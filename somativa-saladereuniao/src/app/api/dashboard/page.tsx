// app/reservas/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Sala {
  _id: string;
  nome: string;
  capacidade: number;
  recursos: string[];
}

interface Reserva {
  _id: string;
  sala: Sala;
  inicio: string;
  fim: string;
}

export default function ReservasPage() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const salasRes = await fetch("/api/salas");
        const salasData = await salasRes.json();
        setSalas(salasData);

        const reservasRes = await fetch("/api/reservas");
        const reservasData = await reservasRes.json();
        setReservas(reservasData);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas de Salas</h1>

      {salas.map((sala) => (
        <div key={sala._id} className="border p-4 mb-3 rounded">
          <h2 className="text-xl font-semibold">{sala.nome}</h2>
          <p>Capacidade: {sala.capacidade}</p>
          <p>Recursos: {sala.recursos.join(", ") || "Nenhum"}</p>

          <h3 className="mt-2 font-medium">Reservas do Dia:</h3>
          <ul>
            {reservas
              .filter((r) => r.sala._id === sala._id)
              .map((r) => (
                <li key={r._id}>
                  {new Date(r.inicio).toLocaleTimeString()} - {new Date(r.fim).toLocaleTimeString()}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
