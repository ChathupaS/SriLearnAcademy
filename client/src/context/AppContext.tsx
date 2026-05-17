import { createContext, useEffect, useState } from "react";
import { dummyCourses, type Course } from "../assets/assets";

interface AppContextType {
  currency: string;
  allCourses: Course[];
  setAllCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const currency = (import.meta.env.VITE_CURRENCY ?? "$") as string;

  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value: AppContextType = { currency, allCourses, setAllCourses };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
