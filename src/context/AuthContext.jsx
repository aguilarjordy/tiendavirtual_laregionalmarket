import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return null;

      const parsed = JSON.parse(storedUser);

      // ✅ Validación: debe ser objeto con name y email strings
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof parsed.name === "string" &&
        typeof parsed.email === "string"
      ) {
        return parsed;
      }

      // Si está mal formado, limpiar storage
      localStorage.removeItem("user");
      return null;
    } catch {
      return null;
    }
  });

  // 🔐 Iniciar sesión
  const login = (name, email) => {
    if (typeof name !== "string" || typeof email !== "string") return;
    const fakeUser = { name, email };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  // 🚪 Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔁 Sincronizar si cambia el storage (por otras pestañas)
  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem("user");
        if (!stored) {
          setUser(null);
          return;
        }
        const parsed = JSON.parse(stored);
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          typeof parsed.name === "string" &&
          typeof parsed.email === "string"
        ) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ✅ Protección de rutas
export function RequireAuth({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;
  return children;
}
