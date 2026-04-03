"use client";

import React, { useEffect, useState } from "react";
import RoomCard from "./Cards/RoomCard";
import { Room } from "./types";

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salas`);
        const data: Room[] = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Erro ao buscar salas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleReserve = (roomName: string) => {
    console.log("Reservando sala:", roomName);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Carregando salas...
      </p>
    );
  if (!rooms.length)
    return <p className="text-center mt-10 text-gray-500">Nenhuma sala encontrada.</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onReserve={handleReserve} />
      ))}
    </div>
  );
}