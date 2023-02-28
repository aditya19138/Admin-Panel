import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoursePhoto from "../assets/CoursePhoto.png";

export default function CourseCard(props) {
    const navigate = useNavigate();
    console.log(props);
    const handleLearn = (e) => {
        e.preventDefault();
        const course_id = e.target.getAttribute("id");
        const params = {
            course_id,
        };
        let url = "/coursedetails";
        let uri = axios.getUri({ url, params });
        navigate(uri);
    };

    return (
        <div className=" p-[1px] bg-gradient-to-b from-[#676565] to-[#202020] rounded-md m-4">
            <div className="p-5 bg-[#202020] rounded-md">
                <div>
                    {/* image  */}
                    <img src={props.image || CoursePhoto} alt="Course Display" />
                </div>
                <div className="flex justify-between my-4 mb-2">
                    {/* heading and share  */}
                    <div>
                        <h1 className="font-BrinnanBold text-white tracking-wider text-base">
                            {props.title}
                        </h1>
                    </div>
                    {/* <div className='flex gap-2'>
                 <button><AiOutlineHeart color="white" /></button>
               <button><AiOutlineShareAlt color="white" /></button> 
                
                </div> */}
                </div>
                <div>
                    {/* desc */}
                    <p className="text-neutral-400 font-InterRegular text-[0.68rem] my-4 mt-2">
                        {props.description}
                    </p>
                </div>
                <div className="my-5 mb-0 pt-1 flex justify-between">
                    {/* button and coming soon  */}
                    {props.lectures?.length ? (
                        <button
                            type="button"
                            id={props.id}
                            onClick={handleLearn}
                            class="text-[#151515] bg-[#2AF1FF] tracking-widest rounded text-[0.5rem]  font-BrinnanBold px-4 py-2.5 text-center  "
                        >
                            LEARN MORE <span className="font-InterSemibold">↗ </span>
                        </button>
                    ) : (
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#797979CC] to-[#4B4B4BCC] font-BrinnanBold  text-md font-extrabold  mt-1">
                            COMING SOON
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
