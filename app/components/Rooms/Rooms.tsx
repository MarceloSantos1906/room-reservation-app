"use client";

import React from "react";
import RoomCard from "./Cards/RoomCard";
import { rooms } from "./constants/constants";

export default function Rooms() {
  return (
    <div className="relative w-full min-h-screen py-16 px-4 md:px-16 bg-gray-100">
      {/* Título */}
      <div className="max-w-6xl mx-auto mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          Salas Disponíveis
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Confira as salas e faça suas reservas
        </p>
      </div>

      {/* Grid de salas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}