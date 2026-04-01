"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Mail, Shield } from "lucide-react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("professor");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: name,
            email,
            tipo: userType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      alert("Usuário cadastrado com sucesso!");
      setName("");
      setEmail("");
      setUserType("professor");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-linear-to-r from-blue-800 via-teal-400 to-teal-500 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md sm:max-w-lg p-6 sm:p-8">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Image
            src="/images/unespar.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain w-20 sm:w-24 md:w-28 h-auto"
            priority
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#1E3A8A] mb-6 sm:mb-8 leading-tight">
          Cadastro de Usuário / ADM
        </h1>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-[#000000]">
              <User size={16} />
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-[#000000]">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-[#000000]">
              <Shield size={16} />
              Tipo
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="professor">Professor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg transition text-sm sm:text-base font-medium"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}