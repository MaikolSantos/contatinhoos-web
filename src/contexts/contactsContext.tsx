import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";

interface ContactsProvidersProps {
  children: React.ReactNode;
}

interface ContactsContextProps {
  contacts: ContactsProps[];
  readContacts: () => Promise<void>;
}

interface ContactsProps {
  id: number;
  email: string;
  name: string;
  phone: string;
}

const ContactsContext = createContext<ContactsContextProps>(
  {} as ContactsContextProps
);

const ContactsProvider = ({ children }: ContactsProvidersProps) => {
  const { setUser } = useUser();
  const [contacts, setContacts] = useState<ContactsProps[]>([]);

  const readContacts = async () => {
    try {
      const response = await api.get("/contacts");

      setContacts(response.data.contacts);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactsContext.Provider value={{ contacts, readContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };
