import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    TextField
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';

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
            // axios posst request to serve
            axios.post(`${process.env.REACT_APP_API_URL}/client/lecture/add`, {
                no: 1,
                title: title,
                content: editorRef.current.getContent(),
                courseId: selectedCourse
            })
                .then(function (response) {
                    console.log(response);
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

    return (
        <>
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
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
            <h2>Content</h2>
            <Editor apiKey='18njo3cex5ijqgdwlkqewqxzo8xxvuiln9hwtasdb5muxnth'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={content ? content : "<p>Type here !!</p>"}
                init={{
                    selector: 'textarea#local-upload',
                    plugins: 'image code',
                    toolbar: 'undo redo | image code| formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',

                    /* without images_upload_url set, Upload tab won't show up*/
                    images_upload_url: 'postAcceptor.php',

                    /* we override default upload handler to simulate successful upload*/
                    images_upload_handler: function (blobInfo, success, failure) {
                        setTimeout(function () {
                            /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                            success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                        }, 2000);
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={LecId ? updateLecture : addNewLec}>{LecId ? "Update Lecture" : "Add Lecture"}</button>
        </>
    );
};

export default Lectures;
