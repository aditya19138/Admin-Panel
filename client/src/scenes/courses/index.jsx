import React, { useState, useEffect } from "react";
import CourseCard from "../../components/coursecard";
import axios from "axios";
import CoursePhoto from "../../assets/CoursePhoto.png";

export default function Coursepage() {
    const [courseData, setCourseData] = useState([]);
    const fetchCourses = async () => {
        await axios({
            method: "get",
            url: `http://localhost:5000/client/courses`,
        }).then((res) => {
            console.log(res);
            setCourseData(res.data);
            console.log(courseData);
        });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="min-h-screen bg-[#171717] bg-fixed bg-bgPattern p-5 pt-24">
            <div className="flex flex-col items-center">
                <h1 className="text-white font-BrinnanBold text-center text-5xl py-5 uppercase">
                    Courses
                </h1>
                <p className="text-neutral-400 font-InterRegular text-center text-base pb-5 w-3/4">
                    The Lumos Education Platform offers newbie developers the opportunity
                    to get acquainted with the fundamental concepts of the web3 ecosystem
                    such as blockchain technology, cryptocurrencies, tokens, wallets, NFTs
                    apart from broaching present and future applications.
                </p>
            </div>
            <div className="grid md:grid-cols-3 md:p-5">
                {courseData?.map((course) => {
                    // console.log(course._id);
                    return (
                        <CourseCard
                            id={course._id}
                            title={course.courseName}
                            description={course.courseDescription}
                            image={CoursePhoto}
                            link={course.link}
                            lectures={course.lectures}
                        />
                    );
                }, [])}
            </div>
        </div>
    );
}
