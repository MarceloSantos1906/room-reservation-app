"use client";

import React from "react";
import { Users } from "lucide-react";

type RoomProps = {
  name: string;
  capacity: number;
  status: "disponivel" | "ocupada" | "reservada";
  onReserve: (roomName: string) => void;
};

export default function RoomCard({
  name,
  capacity,
  status,
  onReserve,
}: RoomProps) {
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

  return (
    <div className="rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out bg-white">
      <div className="p-6 flex flex-col items-start text-left">
        <h3 className="text-lg md:text-xl font-bold text-[#000000]">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-6">
          <Users size={18} className="text-[#000000]" />
          <p className="text-[#000000] text-sm md:text-base">
            Capacidade: {capacity} pessoas
          </p>
        </div>

        <div className="w-full border-t border-gray-200 my-4"></div>

        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
          >
            {statusLabel[status]}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          {status === "disponivel" && (
            <button
              onClick={() => onReserve(name)}
              className="bg-[#008000] hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Reservar
            </button>
          )}

          <button className="bg-[#2563EB] border border-[#1E3A8A] text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}