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
    const [categoryData, setCategoryData] = useState(null);
    const [instructorData, setInstructorData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const fetchCategories = async () => {
        await axios({
            method: "get",
            url: `http://localhost:5000/client/categories`,
        }).then((res) => {
            console.log(res);
            setCategoryData(res.data);
            // console.log(courseData);
        });
    };
    const fetchInstructors = async () => {
        await axios.get(`http://localhost:5000/client/instructors`)
            .then((response) => {
                setInstructorData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleCategorySelectChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value);
    }
    // const addAssignment = async (lectureId) => {
    //     const options = [option1, option2, option3, option4];
    //     await axios.post(`http://localhost:5000/client/assignments/add`, {
    //         lectureId: lectureId,
    //         question: question,
    //         type: "multiple-choice",
    //         options: options,
    //         correctAns: answer
    //     }).then((response) => {
    //         alert("Assignment added successfully");
    //         console.log(response.data)
    //     }).catch((error) => {
    //         console.log(error)
    //     });
    // }
    // useEffect(() => {
    //     console.log(selectedCourse);
    //     fetchLectures();
    // }, [selectedCourse]);

    // useEffect(() => {
    //     console.log(selectedLecture);
    // }, [selectedLecture]);

    // useEffect(() => {
    //     console.log(lecData);
    // }, [lecData]);


    useEffect(() => {
        fetchCategories();
        fetchInstructors();
    }, []);
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '75%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <h1>
                    Add Course
                </h1>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedCategory}
                        label="Select a Category"
                        onChange={handleCategorySelectChange}
                    >
                        {categoryData?.map((category) => (
                            <MenuItem value={category._id}>{category.categoryName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Instructor</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedInstructor}
                        label="Select an Instructor"
                        onChange={(e) => setSelectedInstructor(e.target.value) && console.log(e.target.value)}
                    >
                        {instructorData?.map((instructor) => (
                            <MenuItem value={instructor._id}>{instructor.first_name + " " + instructor.last_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Course Title"
                    multiline
                    maxRows={1}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    id="filled-multiline-flexible "
                    // style={{ width: '50%' }}
                    label="Course Description"
                    multiline
                    maxRows={14}
                    variant="filled"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="success"
                // onClick={() => addAssignment(selectedLecture)}
                >
                    Submit Course
                </Button>
            </div>
        </Box>
    );
}


