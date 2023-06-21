import { useContext } from "react";
import { ContactsContext } from "../contexts/contactsContext";

const useContacts = () => {
  const context = useContext(ContactsContext);

  return context;
};

export { useContacts };
