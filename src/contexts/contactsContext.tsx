import { createContext, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

interface ContactsProvidersProps {
  children: React.ReactNode;
}

interface ContactsContextProps {
  contacts: ContactsProps[];
  readContacts: () => Promise<void>;
  createPDF: () => void;
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
  const { setUser, user } = useUser();
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

  const createPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const title: TDocumentDefinitions["header"] = [
      {
        text: `Contatos de ${user.name}`,
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45],
      },
    ];

    const contactsToBody = contacts.map((contact) => {
      return [
        { text: contact.id, fontSize: 10, margin: [0, 5, 0, 0] },
        { text: contact.name, fontSize: 10, margin: [0, 5, 0, 0] },
        { text: contact.email, fontSize: 10, margin: [0, 5, 0, 0] },
        { text: contact.phone, fontSize: 10, margin: [0, 5, 0, 0] },
      ];
    });

    const contactsContent: TDocumentDefinitions["content"] = [
      {
        style: "",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*"],
          body: [
            [
              { text: "ID", style: "tableHeader", fontSize: 12 },
              { text: "Nome", style: "tableHeader", fontSize: 12 },
              { text: "E-mail", style: "tableHeader", fontSize: 12 },
              { text: "Telefone", style: "tableHeader", fontSize: 12 },
            ],
            ...contactsToBody,
          ],
        },
        layout: "lightHorizontalLines",
      },
    ];

    const footer = (currentPage: number, countPage: number): Content[] => {
      return [
        {
          text: `${currentPage} / ${countPage}`,
          alignment: "right",
          fontSize: 10,
          margin: [0, 10, 50, 10],
        },
      ];
    };

    const docOptions: TDocumentDefinitions = {
      pageSize: "A4",
      pageMargins: [15, 75, 15, 50],
      header: title,
      content: [contactsContent],
      footer: footer,
    };

    pdfMake.createPdf(docOptions).download();
  };

  return (
    <ContactsContext.Provider value={{ contacts, readContacts, createPDF }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };
