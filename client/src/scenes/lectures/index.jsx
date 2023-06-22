import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function AlertLectureAdded({ alertLecAdded, handleClick }) {
    return (
        <div>
            <Dialog
                open={alertLecAdded}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClick()}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Lec Added Sucessfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClick()}>Cool</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function AlertLectureUpdated({ alertLectureUpdated, handleClick }) {
    return (
        <div>
            <Dialog
                open={alertLectureUpdated}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClick()}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Lec Updated Sucessfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClick()}>Cool</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function AlertLectureErr({ alertLecAddedErr, handleClick }) {
    return (
        <div>
            <Dialog
                open={alertLecAddedErr}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClick()}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Something went wrong, Please try again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClick()}>Cool</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const Lectures = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [contentList, setContentList] = useState([{ paragraphs: [""], subHeading: "", images: [] }]);
    const editorRef = useRef(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const LecId = searchParams.get("lecId");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [alertLecAdded, setAlertLecAdded] = useState()
    const [alertLecAddedErr, setAlertLecAddedErr] = useState()
    const [alertLecUpdated, setAlertLecUpdated] = useState()


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
        if (LecId)
            fetchLecture();
    }, [LecId]);

    const updateLecture = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/client/lecture/update`, {
            title: title,
            content: contentList,
            lectureId: LecId
        })
            .then(function (response) {
                etAlertLecAdded(true)
            })
            .catch(function (error) {
                setAlertLecAddedErr(true)
            });
    };

    const addNewLec = () => {
        if (selectedCourse) {
            axios.post(`${process.env.REACT_APP_API_URL}/client/lecture/add`, {
                no: 1,
                title: title,
                content: contentList,
                courseId: selectedCourse
            })
                .then(function (response) {
                    setAlertLecAdded(true)
                })
                .catch(function (error) {
                    setAlertLecAddedErr(true)
                });
        }
        else {
            setAlertLecAddedErr(true)
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
        setAlertLecAdded();
        setAlertLecAddedErr();
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
    const handleLecAddedClick = () => {
        setAlertLecAdded(false);
        const params = {
            course_id: selectedCourse
        };
        let url = "/coursedetails";
        let uri = axios.getUri({ url, params });
        navigate(uri);
    }

    const handleLecAddedErrClick = () => {
        setAlertLecAddedErr(false);
    }

    const handleLecUpdated = () => {
        setAlertLecUpdated(false);
        const params = {
            course_id: selectedCourse
        };
        let url = "/coursedetails";
        let uri = axios.getUri({ url, params });
        navigate(uri);
    }

    return (
        <div>
            <AlertLectureAdded alertLecAdded={alertLecAdded} handleClick={handleLecAddedClick} />
            <AlertLectureErr alertLecAddedErr={alertLecAddedErr} handleClick={handleLecAddedErrClick} />
            <AlertLectureUpdated alertLecUpdated={alertLecUpdated} handleClick={handleLecUpdated} />
            <div style={{ margin: '2rem' }}>
                <div className="indexLec">
                    <TextField id="outlined-basic" label={title ? title : "Enter Title"} variant="outlined" onChange={(event) => setTitle(event.target.value)} />
                    <FormControl sx={{ m: 1, minWidth: 320 }}>
                        <InputLabel id="demo-simple-select-helper-label">Select course</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedCourse}
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
                    <div style={{ marginBottom: '2rem' }}>
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
                            style={{ display: 'block' }}
                            onClick={handleSubHeadingRemove}
                            className="button"
                        >
                            Remove Subheading
                        </Button>
                        {contentList.length - 1 === indexSubH &&
                            <Button variant="contained"
                                style={{ marginTop: '15px', display: 'block' }}
                                onClick={handleSubHeadingAdd}
                                className="buttonArea"
                            >
                                Add Subheading
                            </Button>}
                    </div >
                ))}
                <Button variant="contained" onClick={LecId ? updateLecture : addNewLec}>{LecId ? "Update Lecture" : "Add Lecture"}</Button>
            </div>
        </div>
    );
};

export default Lectures;
