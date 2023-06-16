import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


export default function MultilineTextFields() {
    const [courseData, setCourseData] = useState(null);
    const [lecData, setLecData] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [question, setQuestion] = useState(null);
    const [quesType, setQuesType] = useState("multi-line");
    const [answer, setAnswer] = useState(null);
    const [option1, setOption1] = useState(null);
    const [option2, setOption2] = useState(null);
    const [option3, setOption3] = useState(null);
    const [option4, setOption4] = useState(null);

    const fetchCourses = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/client/courses`,
        }).then((res) => {
            console.log(res);
            setCourseData(res.data);
            // console.log(courseData);
        });
    };
    const fetchLectures = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/lectures?id=${selectedCourse}`)
            .then((response) => {
                setLecData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleCourseSelectChange = (e) => {
        setSelectedCourse(e.target.value);
        console.log(e.target.value);
    }
    const addAssignment = async (lectureId) => {
        const options = [option1, option2, option3, option4];
        await axios.post(`${process.env.REACT_APP_API_URL}/client/assignments/add`, {
            lectureId: lectureId,
            question: question,
            type: quesType,
            options: options,
            correctAns: answer
        }).then((response) => {
            alert("Assignment added successfully");
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        console.log(selectedCourse);
        if (selectedCourse)
            fetchLectures();
    }, [selectedCourse]);

    useEffect(() => {
        console.log(selectedLecture);
    }, [selectedLecture]);

    useEffect(() => {
        console.log(lecData);
    }, [lecData]);


    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '75%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ marginLeft: '2rem' }}>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select course</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedCourse}
                        label="Select a Course"
                        onChange={handleCourseSelectChange}
                    >
                        {courseData?.map((course) => (
                            <MenuItem value={course._id}>{course.courseName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Lecture</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedLecture}
                        label="Select a Lecture"
                        onChange={(e) => setSelectedLecture(e.target.value) && console.log(e.target.value)}
                    >
                        {lecData?.map((lecture) => (
                            <MenuItem value={lecture._id}>{lecture.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Question Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={quesType}
                        label="Select Question Type"
                        onChange={(e) => setQuesType(e.target.value) && console.log(e.target.value)}
                    >
                        <MenuItem value="multi-line">Multi-line</MenuItem>
                        <MenuItem value="single-line">Single-line</MenuItem>


                    </Select>
                </FormControl>
            </div>
            <div style={{ marginLeft: '1.5rem' }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Question"
                    multiline
                    maxRows={4}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            {(quesType === "multi-line") && (
                <div style={{ marginLeft: '1.5rem' }}>
                    <TextField
                        id="filled-multiline-flexible "
                        style={{ width: '50%' }}
                        label="Option 1"
                        multiline
                        maxRows={4}
                        variant="filled"
                        onChange={(e) => setOption1(e.target.value)}
                    />
                    <TextField
                        id="filled-multiline-flexible "
                        style={{ width: '50%' }}
                        label="Option 2"
                        multiline
                        maxRows={4}
                        variant="filled"
                        onChange={(e) => setOption2(e.target.value)}
                    />
                    <TextField
                        id="filled-multiline-flexible "
                        style={{ width: '50%' }}
                        label="Option 3"
                        multiline
                        maxRows={4}
                        variant="filled"
                        onChange={(e) => setOption3(e.target.value)}
                    />
                    <TextField
                        id="filled-multiline-flexible "
                        style={{ width: '50%' }}
                        label="Option 4"
                        multiline
                        maxRows={4}
                        variant="filled"
                        onChange={(e) => setOption4(e.target.value)}
                    />
                </div>)}
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1.5rem" }}>
                <TextField
                    id="filled-multiline-flexible "
                    style={{ width: '50%' }}
                    label="Correct Answer"
                    multiline
                    maxRows={4}
                    variant="filled"
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => addAssignment(selectedLecture)}
                    style={{ width: '15%', marginLeft: '1rem', marginTop: '1rem' }}
                >
                    Submit Question
                </Button>
            </div>
        </Box>
    );
}


