import { createContext, useState } from "react";

interface UserProvidersProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: UserProps,
  setUser: React.Dispatch<React.SetStateAction<UserProps>>
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
