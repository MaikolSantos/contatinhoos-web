import { useEffect } from "react";
import { useContacts } from "../../hooks/useContacts";
import { useUser } from "../../hooks/useUser";

export const Dashboard = () => {
  const { contacts, readContacts } = useContacts();
  const { user } = useUser();

  useEffect(() => {
    readContacts();
  }, []);

  return (
    <>
      <div>{user.name}</div>

      <ul>
        {contacts.length &&
          contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} {contact.phone} {contact.email}
            </li>
          ))}
      </ul>
    </>
  );
};
