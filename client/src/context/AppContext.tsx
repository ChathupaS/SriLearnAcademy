import { createContext, useEffect, useState } from "react";
import { dummyCourses, type Course, type Chapter } from "../assets/assets";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import humanizeDuration from "humanize-duration";

interface AppContextType {
  currency: string;
  allCourses: Course[];
  navigate: NavigateFunction;
  calculateRating: (course: Course) => number;
  isEducator: boolean;
  setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
  calculateChapterTime: (chapter: Chapter) => string;
  calculateCourseDuration: (course: Course) => string;
  calculateNumberOfLecures: (course: Course) => number;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const currency = (import.meta.env.VITE_CURRENCY ?? "$") as string;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isEducator, setIsEducator] = useState<boolean>(true);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  //Function to calculate average rating of course
  const calculateRating = (course: Course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  //Function to calculate course chapter time
  const calculateChapterTime = (chapter: Chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //Function to calculate the course duration
  const calculateCourseDuration = (course: Course) => {
    let time = 0;
    course.courseContent.map((chapter) => {
      chapter.chapterContent.map((lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //Function to calculate number of lecturers in the course
  const calculateNumberOfLecures = (course: Course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value: AppContextType = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLecures,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
