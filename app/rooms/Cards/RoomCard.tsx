"use client";

import React from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

type RoomProps = {
  id: string; 
  name: string;
  capacity: number;
  status: "disponivel" | "ocupada" | "reservada";
  onReserve: (roomName: string) => void;
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
    disponivel: "bg-[#008000] text-white",
    ocupada: "bg-[#EF4444] text-white",
    reservada: "bg-[#EAB308] text-white",
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
    <div className="rounded-xl shadow-md overflow-hidden bg-white">
      <div className="p-6 flex flex-col items-start text-left">
        <h3 className="text-lg md:text-xl font-bold text-[#000000]">{name}</h3>

        <div className="flex items-center gap-2 mt-6 text-[#000000]">
          <Users size={18} />
          <p className="text-sm md:text-base">Capacidade: {capacity} pessoas</p>
        </div>

        <div className="w-full border-t border-gray-200 my-4"></div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
        >
          {statusLabel[status]}
        </span>

        <div className="flex flex-wrap gap-3 mt-5">
          {status === "disponivel" && (
            <button
              onClick={() => onReserve(name)}
              className="bg-[#008000] hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Reservar
            </button>
          )}

          <button
            onClick={handleViewDetails}
            className="bg-[#2563EB] border border-[#1E3A8A] text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}