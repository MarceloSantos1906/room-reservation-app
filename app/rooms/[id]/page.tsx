"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, Monitor } from "lucide-react";

type Equipment = {
  id: string;
  nome: string;
  descricao?: string;
  quantidade: number;
};

type Room = {
  id: string;
  nome_numero: string;
  bloco: string;
  tipo_sala: string;
  capacidade: number;
  ativo: boolean;
  equipamentos: Equipment[];
};

export default function RoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const statusColors: Record<string, string> = {
    sala_aula: "bg-blue-500 text-white",
    laboratorio: "bg-purple-500 text-white",
    default: "bg-gray-300 text-black",
  };

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true); 
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salas/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error("Erro ao buscar sala:", err);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Carregando...
      </p>
    );

  if (!room)
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        Sala não encontrada
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => router.push("/rooms")} 
        className="mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm transition"
      >
        Voltar
      </button>
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {room.nome_numero} - {room.bloco}
          </h1>
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              statusColors[room.tipo_sala] || statusColors.default
            }`}
          >
            {room.tipo_sala === "sala_aula" ? "Sala de Aula" : "Laboratório"}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-5 text-gray-700">
          <Users className="text-gray-500" />
          <p className="font-medium">{room.capacidade} pessoas</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Monitor /> Equipamentos
          </h2>

          {room.equipamentos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {room.equipamentos.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm flex flex-col gap-2"
                >
                  <span className="font-semibold text-gray-800">{eq.nome}</span>
                  {eq.descricao && (
                    <span className="text-gray-600 text-sm">{eq.descricao}</span>
                  )}
                  <span className="text-gray-700 text-sm">
                    Quantidade: {eq.quantidade}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum equipamento cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}