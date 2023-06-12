import { createContext, useState } from "react";
import { TRegister } from "../pages/Register/validators";
import { api } from "../services/api";

interface UserProvidersProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: UserProps,
  setUser: React.Dispatch<React.SetStateAction<UserProps>>,
  createUser: (data: TRegister) => Promise<void>
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserProvider = ({ children }: UserProvidersProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const createUser = async (data: TRegister) => {
    try {
      await api.post("/users", data)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
