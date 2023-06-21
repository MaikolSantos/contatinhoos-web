import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useUser = () => {
  const context = useContext(UserContext);

  return context;
};

export { useUser };
