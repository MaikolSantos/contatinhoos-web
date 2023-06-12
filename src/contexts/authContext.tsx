import { createContext, useEffect, useState } from "react";
import { TLogin } from "../pages/Login/validators";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface AuthProvidersProps {
  children: React.ReactNode;
}

interface AuthValuesProps {
  login: (data: TLogin) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthValuesProps>({} as AuthValuesProps);

const AuthProvider = ({ children }: AuthProvidersProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("contatinhoos:token");

    if (!token) {
      setLoading(false);
      navigate("/");
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setLoading(false);
  }, []);

  const login = async (data: TLogin) => {
    try {
      const response = await api.post("/login", data);

      console.log(response.data)

      const token = response.data.token;

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      localStorage.setItem("contatinhoos:token", token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
