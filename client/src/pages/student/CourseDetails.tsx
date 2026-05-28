import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import type { Course } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const { allCourses } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id) ?? null;
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-betweenndLpx-36 px-8 md:pt-30 pt-20 text-left">
      <div className="absolute top-0 left-0 w-full h-section-height bg-linear-to-b from-cyan-100/70"></div>
      {/* left column */}
      <div>hi</div>
      {/* right column */}
      <div>bye</div>
    </div>
  );
};

export default CourseDetails;
