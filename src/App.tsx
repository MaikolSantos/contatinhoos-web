import { AuthProvider } from "./contexts/authContext";
import { ContactsProvider } from "./contexts/contactsContext";
import { UserProvider } from "./contexts/userContext";
import { RoutesMain } from "./routes";
import { GlobalStyles } from "./styles/global";

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <UserProvider>
          <ContactsProvider>
            <RoutesMain />
          </ContactsProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
};
