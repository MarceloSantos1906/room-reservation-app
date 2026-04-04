"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  FileText,
  BookOpen,
} from "lucide-react";

type Props = {
  roomId: string;
  onClose: () => void;
};

export default function ReservationModal({
  roomId,
  onClose,
}: Props) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [turno, setTurno] = useState("matutino");
  const [lessonNumber, setLessonNumber] = useState(1);
  const [observation, setObservation] = useState("");

  const handleSubmit = async () => {
    if (!subject || !date) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      const usuarioId = localStorage.getItem("userId");

      if (!usuarioId) {
        alert("Usuário não encontrado.");
        return;
      }

      const payload = {
        sala_id: roomId,
        usuario_id: usuarioId,
        criado_por: usuarioId,
        data: date,
        turno,
        aula_numero: lessonNumber,
        motivo: `${subject}${observation ? " - " + observation : ""}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao reservar sala");
      }

      alert("Reserva realizada com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar reserva");
    }
  };

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Reservar Sala
        </h2>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
              <BookOpen size={16} />
              Disciplina
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
              <CalendarDays size={16} />
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
              <Clock3 size={16} />
              Turno
            </label>
            <select
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-black mb-2 block">
              Aula número
            </label>
            <input
              type="number"
              min={1}
              max={6}
              value={lessonNumber}
              onChange={(e) =>
                setLessonNumber(Number(e.target.value))
              }
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
              <FileText size={16} />
              Observação
            </label>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              Confirmar
            </button>

            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}