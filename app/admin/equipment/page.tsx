"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Home, Users, Monitor, Cpu, Building2 } from "lucide-react";

type RoomType = "sala_aula" | "laboratorio";

type Equipment = {
  id: string;
  nome: string;
};

type SelectedEquipment = {
  equipamento_id: string;
  quantidade: number;
};

export default function RoomsForm() {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState<RoomType>("sala_aula");
  const [machines, setMachines] = useState("");
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<SelectedEquipment[]>([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipamentos`);
      const data = await response.json();
      setEquipments(data);
    };

    fetchEquipments();
  }, []);

  const toggleEquipment = (id: string) => {
    setSelectedEquipments((prev) => {
      const exists = prev.find((item) => item.equipamento_id === id);

      if (exists) {
        return prev.filter((item) => item.equipamento_id !== id);
      }

      return [...prev, { equipamento_id: id, quantidade: 1 }];
    });
  };

  const updateQuantity = (id: string, quantidade: number) => {
    setSelectedEquipments((prev) =>
      prev.map((item) =>
        item.equipamento_id === id
          ? { ...item, quantidade: quantidade < 1 ? 1 : quantidade }
          : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const roomPayload = {
        nome_numero: roomName,
        capacidade: Number(capacity),
        tipo_sala: type,
        maquinas: type === "laboratorio" ? Number(machines) : null,
      };

      const roomResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomPayload),
      });

      if (!roomResponse.ok) {
        alert("Erro ao cadastrar sala");
        return;
      }

      const createdRoom = await roomResponse.json();
      const roomId = createdRoom.id;

      await Promise.all(
        selectedEquipments.map((equipment) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salas/${roomId}/equipamentos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(equipment),
          })
        )
      );

      alert("Sala cadastrada com equipamentos!");

      setRoomName("");
      setCapacity("");
      setType("sala_aula");
      setMachines("");
      setSelectedEquipments([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar sala");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-linear-to-br from-blue-900 via-blue-700 to-teal-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <Image src="/images/unespar.png" alt="Logo" width={110} height={110} priority />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#1E3A8A] mb-8">
          Cadastro de Sala
        </h1>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
              <Home size={16} /> Nome / Número
            </label>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Ex: Sala 101"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
              <Users size={16} /> Capacidade
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Ex: 30"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
              <Building2 size={16} /> Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RoomType)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="sala_aula">Sala</option>
              <option value="laboratorio">Laboratório</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
              <Monitor size={16} /> Equipamentos
            </label>

            <div className="space-y-3">
              {equipments.map((item) => {
                const selected = selectedEquipments.find(
                  (eq) => eq.equipamento_id === item.id
                );

                return (
                  <div
                    key={item.id}
                    className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected}
                        onChange={() => toggleEquipment(item.id)}
                        className="accent-blue-600"
                      />
                      <span>{item.nome}</span>
                    </label>

                    {selected && (
                      <input
                        type="number"
                        min={1}
                        value={selected.quantidade}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-full sm:w-28 border rounded-lg px-3 py-2"
                        placeholder="Qtd"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {type === "laboratorio" && (
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Cpu size={16} /> Quantidade de PCs
              </label>
              <input
                type="number"
                value={machines}
                onChange={(e) => setMachines(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Ex: 20"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
          >
            Cadastrar Sala
          </button>
        </div>
      </div>
    </div>
  );
}
