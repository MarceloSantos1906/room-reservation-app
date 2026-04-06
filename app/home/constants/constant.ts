import { BsCalendar, BsPerson,BsDoorOpen } from "react-icons/bs";

export const Navlinks = [
  { id: 1, url: "/rooms", label: "Salas" },
  { id: 2, url: "/reservations", label: "Reservas" },
  { id: 3, url: "/login", label: "Login" }, 
];

export const features = [
  {
    id: 1,
    title: "Salas",
    description: "Visualize e reserve salas disponíveis.",
    icon: BsDoorOpen,
    path: "/rooms",
  },
  {
    id: 2,
    title: "Reservas",
    description: "Acompanhe suas reservas realizadas.",
    icon: BsCalendar,
    path: "/reservations",
  },
  {
    id: 3,
    title: "Painel Administrativo",
    description:
      "Gerencie salas, usuários e reservas do sistema.",
    icon: BsPerson,
    path: "/admin",
    adminOnly: true,
  },
];