"use client";

import {
    CalendarDays,
    Clock3,
    BookOpen,
    Building2,
    BadgeInfo,
} from "lucide-react";

type Props = {
    roomName: string;
    professor: string;
    date: string;
    turno: string;
    lessonNumber: number;
    motivo: string;
    status: string;
};

export default function ReservationCard({
    roomName,
    professor,
    date,
    turno,
    lessonNumber,
    motivo,
    status,
}: Props) {
    const statusStyles = {
        ativa: "bg-green-500 text-white",
        aberta: "bg-blue-500 text-white",
        concluida: "bg-gray-500 text-white",
        cancelada: "bg-red-500 text-white",
    };

    const statusColor =
        statusStyles[status as keyof typeof statusStyles] ||
        "bg-gray-500 text-white";
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-black">
                    {roomName}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                >
                    {status}
                </span>
            </div>

            <div className="space-y-3 text-black">
                <p className="flex items-center gap-2">
                    <BookOpen size={18} />
                    <strong>Professor:</strong> {professor}
                </p>

                <p className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <strong>Data:</strong> {date}
                </p>

                <p className="flex items-center gap-2">
                    <Clock3 size={18} />
                    <strong>Turno:</strong> {turno}
                </p>

                <p className="flex items-center gap-2">
                    <Building2 size={18} />
                    <strong>Aula:</strong> {lessonNumber}
                </p>

                <p className="flex items-start gap-2">
                    <BadgeInfo size={18} className="mt-1" />
                    <span>
                        <strong>Motivo:</strong> {motivo}
                    </span>
                </p>
            </div>
        </div>
    );
}