import { useEffect, useState } from "react";
import { useContacts } from "../../hooks/useContacts";
import { useUser } from "../../hooks/useUser";
import { Modal } from "../../components/Modal";

export const Dashboard = () => {
  const { contacts, readContacts, createPDF } = useContacts();
  const { user } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(true);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    readContacts();
  }, []);

  return (
    <>

      <div>{user.name}</div>

      {isOpenModal && (
        <Modal toggleOpenModal={toggleOpenModal}>Deu certo</Modal>
      )}

      <button onClick={createPDF}>Gerar PDF</button>

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
