export type RoomStatus = "disponivel" | "ocupada" | "reservada";

export const rooms: {
  id: number;
  name: string;
  capacity: number;
  status: RoomStatus;
}[] = [
  {
    id: 1,
    name: "Sala 303",
    capacity: 20,
    status: "disponivel",
  },
  {
    id: 2,
    name: "Sala 304",
    capacity: 15,
    status: "ocupada",
  },
  {
    id: 3,
    name: "Sala 305",
    capacity: 10,
    status: "reservada",
  },
  {
    id: 4,
    name: "Sala 306",
    capacity: 25,
    status: "disponivel",
  },
  {
    id: 5,
    name: "Sala 307",
    capacity: 25,
    status: "disponivel",
  },
  {
    id: 6,
    name: "Sala 308",
    capacity: 25,
    status: "ocupada",
  },
];