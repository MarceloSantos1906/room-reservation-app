"use client";

import React from "react";

type RoomProps = {
  name: string;
  location: string;
  capacity: number;
  icon: React.ElementType;
};

export default function RoomCard({ name, location, capacity, icon: Icon }: RoomProps) {
  return (
    <div className="flex items-center rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out bg-white">
      
      {/* Ícone azul */}
      <div className="flex items-center justify-center w-20 h-20 bg-blue-600 text-white m-4 shrink-0 rounded-full">
        <Icon size={28} />
      </div>

      {/* Informações da sala */}
      <div className="flex-1 p-4 text-left">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm md:text-base">{location}</p>
        <p className="text-gray-500 text-sm md:text-base">Capacidade: {capacity} pessoas</p>
      </div>
    </div>
  );
}