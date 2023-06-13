import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    TextField
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import './index.css'

const Lectures = () => {
    const [title, setTitle] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [contentList, setContentList] = useState([{ paragraphs: [""], subHeading: "", images: [] }]);
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


    const fetchLecture = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/lecture?id=${LecId}`)
            .then((response) => {

                setTitle(response.data[0].title)
                setSelectedCourse(response.data[0].course)
                setContentList(response.data[0].content)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchLecture();
    }, [LecId]);

    const updateLecture = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/client/lecture/update`, {
            title: title,
            content: contentList,
            lectureId: LecId
        })
            .then(function (response) {
                console.log(alert("Lecture Updated Successfully"));
            })
            .catch(function (error) {
                console.log(error);
            });


    };

    const addNewLec = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/client/lecture/add`, {
            no: 1,
            title: title,
            content: contentList,
            courseId: selectedCourse
        })
            .then(function (response) {
                console.log(response);
                alert("Lecture Added Successfully");
            })
            .catch(function (error) {
                console.log(error);
            });


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

    useEffect(() => {
        console.log(contentList)
    }, [contentList]);

    const handleParagraphAdd = (index) => {
        contentList[index].paragraphs.push("");
        setContentList([...contentList])
    }
    const handleParagraphRemove = (indexP, indexSubh) => {
        console.log(indexP)
        contentList[indexSubh].paragraphs.shift(indexP, 1);
        setContentList([...contentList]);

    }

    const handleSubHeadingAdd = () => {
        setContentList([...contentList, { paragraphs: [""], subHeading: "", images: [] }])
    }
    const handleSubHeadingRemove = () => {
        contentList.pop()
        setContentList([...contentList])
    }


    return (
        <div className="index">
            <div className="fields">
                <TextField id="outlined-basic" label={title ? title : "Enter Title"} variant="outlined" onChange={(event) => setTitle(event.target.value)} />
                <FormControl sx={{ m: 1, minWidth: 320 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select course</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedCourse}
                        placeholder="Select a Course"
                        onChange={(e) => setSelectedCourse(e.target.value) && console.log(e.target.value)}
                    >
                        {courses.map((course) => (
                            <MenuItem value={course._id}>{course.courseName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <h2>Content</h2>
            {contentList.map((item, indexSubH) => (
                <div style={{ margin: '20px' }}>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            style={{ width: "50%" }}
                            placeholder="Enter Sub Heading"
                            value={item.subHeading}
                            onChange={(event) => {
                                item.subHeading = event.target.value;
                                setContentList([...contentList])
                            }}
                        />
                    </div>

                    <TextField
                        id="outlined-multiline-flexible"
                        style={{ width: "100%", marginTop: '5px' }}
                        multiline
                        rows={10}
                        placeholder="Write a Paragraph"
                        value={item.paragraphs.join('\n')}
                        onChange={(event) => {
                            item.paragraphs = event.target.value.split('\n');
                            setContentList([...contentList])
                        }}
                    />

                    <Button variant="contained"
                        style={{ display: 'block', marginTop: '0.2rem' }}
                        onClick={handleSubHeadingRemove}
                    >
                        Remove Subheading
                    </Button>

                    {contentList.length - 1 === indexSubH &&
                        <Button variant="contained"
                            style={{ marginTop: '15px', display: 'block' }}
                            onClick={handleSubHeadingAdd}
                        >
                            Add Subheading
                        </Button>}
                </div >
            ))}


            <Button variant="contained" onClick={LecId ? updateLecture : addNewLec}>{LecId ? "Update Lecture" : "Add Lecture"}</Button>
        </div>
    );
};

export default Lectures;
