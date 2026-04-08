"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type User = {
  id: string;
  tipo: string;
  nome?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser({
          id: data.id,
          tipo: data.tipo,
          nome: data.nome,
        });
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  function login(userData: User) {
    setUser(userData);
  }

  async function logout() {
    setLoading(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}