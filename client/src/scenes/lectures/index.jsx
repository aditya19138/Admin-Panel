import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    TextField
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import TextFields from "./TextFields";
import './index.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';




const Lectures = () => {
    const [title, setTitle] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [content, setContent] = useState(null);
    const editorRef = useRef(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const LecId = searchParams.get("lecId");
    console.log("LecId=" + LecId);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [paraCount, setParaCount] = useState(0);
    const [arrJSON, setArrJSON] = useState([])
    const [subParaArr, setSubParaArr] = useState([]);



    const handleIncrement = () => {
        setParaCount((paraCount) => paraCount + 1);
    }


    const handleDecrement = () => {
        setParaCount((paraCount) => paraCount - 1);
        arrJSON.pop();
    }

    useEffect(() => {
        const updatedSubParaArr = [];
        for (let i = 0; i < paraCount; i++) {
            updatedSubParaArr.push(
                <div key={i}>
                    <TextFields memberIndex={i} arr={arrJSON} />
                </div>
            );
        }
        setSubParaArr(updatedSubParaArr);
    }, [paraCount, arrJSON]);


    const fetchLecture = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/lecture?id=${LecId}`)
            .then((response) => {
                setTitle(response.data[0].title)
                setCourseId(response.data[0].course)
                setContent(response.data[0].content)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    if (LecId) {
        fetchLecture();
    }
    const updateLecture = () => {
        if (editorRef.current) {
            console.log(title)
            // axios posst request to serve
            axios.patch(`${process.env.REACT_APP_API_URL}/client/lecture/update`, {
                title: title,
                content: editorRef.current.getContent(),
                lectureId: LecId
            })
                .then(function (response) {
                    console.log(alert("Lecture Updated Successfully"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    const addNewLec = () => {
        if (editorRef.current) {
            console.log(title)
            console.log(editorRef.current.getContent())
            // axios posst request to serve
            axios.post(`${process.env.REACT_APP_API_URL}/client/lecture/add`, {
                no: 1,
                title: title,
                content: [editorRef.current.getContent()],
                courseId: selectedCourse
            })
                .then(function (response) {
                    console.log(response);
                    alert("Lecture Added Successfully");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    const fetchCourses = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/courses`)
            .then((response) => {
                setCourses(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchCourses();
    }, []);
    <Button variant="contained" onClick={handleIncrement}>Add SubPara</Button>
    {paraCount !== 0 && <Button variant="contained" onClick={handleDecrement}>Delete SubPara</Button>}
    return (
        <>
            <div className="index">
                <TextField id="outlined-basic" label={title ? title : "Enter Title"} variant="outlined" onChange={(event) => setTitle(event.target.value)} />
                <FormControl sx={{ m: 1, minWidth: 320 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select course</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedCourse}
                        label="Select a Course"
                        onChange={(e) => setSelectedCourse(e.target.value) && console.log(e.target.value)}
                    >
                        {courses.map((course) => (
                            <MenuItem value={course._id}>{course.courseName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="textField">
                {subParaArr}
                <div className="buttonArea">
                    <Button variant="contained" onClick={handleIncrement}>Add SubPara</Button>
                    {paraCount !== 0 && <Button variant="contained" onClick={handleDecrement} className="button">Delete SubPara</Button>}
                </div>
            </div>
            <Button variant="contained" onClick={LecId ? updateLecture : addNewLec}>{LecId ? "Update Lecture" : "Add Lecture"}</Button>
        </>
    );
};

export default Lectures;
