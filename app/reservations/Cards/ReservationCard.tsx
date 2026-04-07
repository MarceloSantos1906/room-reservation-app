"use client";

import {
  CalendarDays,
  Clock3,
  BookOpen,
  Building2,
  BadgeInfo,
  User,
} from "lucide-react";

type Reservation = {
  bloco: string;
  nome_numero: string;
  usuario_nome: string;
  criado_por_nome?: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  turno: string;
  aula_numero: number;
  motivo: string;
  status: string;
};

type Props = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: Props) {
  const {
    bloco,
    nome_numero,
    usuario_nome,
    criado_por_nome,
    data,
    hora_inicio,
    hora_fim,
    turno,
    aula_numero,
    motivo,
    status,
  } = reservation;

  const statusStyles = {
    ativa: "bg-green-500 text-white",
    aberta: "bg-blue-500 text-white",
    concluida: "bg-gray-400 text-white",
    cancelada: "bg-red-500 text-white",
  };

  const statusColor =
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-500 text-white";

  const formattedDate = new Date(data).toLocaleDateString("pt-BR");
  const formattedStartHour = hora_inicio?.slice(0, 5);
  const formattedEndHour = hora_fim?.slice(0, 5);

  const showCreatedBy =
    criado_por_nome &&
    criado_por_nome.trim() !== "" &&
    criado_por_nome !== usuario_nome;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {nome_numero}
          </h2>
          <p className="text-sm text-gray-500">{bloco}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColor}`}
        >
          {status}
        </span>
      </div>
      <div className="mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <BookOpen size={16} className="text-blue-500" />
          <span className="font-medium">{usuario_nome}</span>
        </div>

        {showCreatedBy && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 ml-6">
            <User size={14} />
            <span>Reserva criada por {criado_por_nome}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-green-500" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} className="text-yellow-500" />
          <span>
            {formattedStartHour} às {formattedEndHour}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-purple-500" />
          <span className="capitalize">{turno}</span>
        </div>

        <div className="flex items-center gap-2">
          <BadgeInfo size={16} className="text-pink-500" />
          <span>{aula_numero}ª aula</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700">
        {motivo}
      </div>
    </div>
  );
}