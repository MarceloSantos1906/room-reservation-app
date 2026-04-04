"use client";

import React from "react";
import { Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type RoomProps = {
  id: string;
  name: string;
  capacity: number;
  status: "disponivel" | "ocupada" | "reservada";
  onReserve: (roomId: string) => void;
};

export default function RoomCard({
  id,
  name,
  capacity,
  status,
  onReserve,
}: RoomProps) {
  const router = useRouter();

  const statusStyles = {
    disponivel: "bg-green-500 text-white",
    ocupada: "bg-red-500 text-white",
    reservada: "bg-yellow-500 text-white",
  };

  const statusLabel = {
    disponivel: "Disponível",
    ocupada: "Ocupada",
    reservada: "Reservada",
  };

  const handleViewDetails = () => {
    router.push(`/rooms/${id}`);
  };

  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-100">
      <div className="p-6 flex flex-col items-start text-left">
        <h3 className="text-lg md:text-xl font-bold text-black">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-5 text-black">
          <Users size={18} />
          <p className="text-sm md:text-base">
            Capacidade: {capacity} pessoas
          </p>
        </div>

        <div className="w-full border-t border-gray-200 my-4"></div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
        >
          {statusLabel[status]}
        </span>

        <div className="flex gap-3 mt-5">
          {status === "disponivel" && (
            <button
              onClick={() => onReserve(id)}
              className="min-w-30 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              Reservar
            </button>
          )}

          <button
            onClick={handleViewDetails}
            className="min-w-30 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Eye size={16} />
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}