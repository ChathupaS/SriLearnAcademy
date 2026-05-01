import { createContext } from "react";

interface AppContextType {
  // add your shared state here, e.g.:
  // user: User | null;
  // setUser: (user: User | null) => void;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
