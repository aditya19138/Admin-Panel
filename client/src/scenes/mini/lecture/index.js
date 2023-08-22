import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./index.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const label = { inputProps: { "aria-label": "Images ?" } };

function AlertMiniAdded({ alertMiniAdded, handleClick }) {
  return (
    <div>
      <Dialog
        open={alertMiniAdded}
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

function AlertMiniUpdated({ alertLectureUpdated, handleClick }) {
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

function AlertMiniErr({ alertMiniAddedErr, handleClick }) {
  return (
    <div>
      <Dialog
        open={alertMiniAddedErr}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClick()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Something went wrong, Please try again,
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick()}>Cool</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function AlertMiniImageErr({ alertMiniImageErr, handleClick }) {
  return (
    <div>
      <Dialog
        open={alertMiniImageErr}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClick()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Max Word Length Exceeded should be 150
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick()}>Cool</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function AlertMiniWordErr({ alertMiniWordErr, handleClick }) {
  return (
    <div>
      <Dialog
        open={alertMiniWordErr}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClick()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Max Word Length Exceeded should be 250
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick()}>Cool</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Mini = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);

  const [contentList, setContentList] = useState([
    { paragraphs: [""], subHeading: "", images: [] },

  ]);
  const editorRef = useRef(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const LecId = searchParams.get("lecId");
  const CorId = searchParams.get("corId");
  console.log("CorId=" + CorId);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [Checked, setChecked] = useState(false);
  const [alertMiniAdded, setAlertMiniAdded] = useState();
  const [alertMiniAddedErr, setAlertMiniAddedErr] = useState();
  const [alertMiniImageErr, setAlertMiniImageErr] = useState();
  const [alertMiniWordErr, setAlertMiniWordErr] = useState();
  const [alertMiniUpdated, setAlertMiniUpdated] = useState();

  const fetchLecture = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/client/lecture?id=${LecId}`)
      .then((response) => {
        setTitle(response.data[0].title);
        setSelectedCourse(response.data[0].course);
        setContentList(response.data[0].content);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (CorId) {
      setSelectedCourse(CorId);
    }
    if (LecId) fetchLecture();
  }, [LecId]);

  const imgTag = new RegExp(
    '(<img)[^/>]*(/>|>)'
  )

  useEffect(() => {
    if (contentList) {
      contentList.forEach((item) => {
        item.paragraphs.forEach((item) => {
          const arr = item.split(" ");
          arr.map((item)=>{if(imgTag.test(item)){setChecked(true)}})
        });
      });
    }
  }, [contentList]);

  const updateLectureApi = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/client/lecture/update`, {
        title: title,
        content: contentList,
        lectureId: LecId,
      })
      .then(function (response) {
        setAlertMiniAdded(true);
      })
      .catch(function (error) {
        setAlertMiniAddedErr(true);
      });
  }

  const updateLecture = () => {
    let len = 0;
    {
      contentList &&
        contentList.map((item) => {
          item.paragraphs.map((item) => {
            len += item.split(" ").length;
          });
          len += item.subHeading.split(" ").length;
        });
    }
    if (Checked) {
      { len <= 150 ? updateLectureApi() : setAlertMiniImageErr(true) }
    }
    else {
      { len <= 250 ? updateLectureApi() : setAlertMiniWordErr(true) }
    }
  };

  const addNewLecApi = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/client/lecture/add`, {
        no: 1,
        title: title,
        content: contentList,
        courseId: selectedCourse,
      })
      .then(function (response) {
        setAlertMiniAdded(true);
      })
      .catch(function (error) {
        setAlertMiniAddedErr(true);
      });
  }

  const addNewLec = () => {
    let len = 0;
    {
      contentList &&
        contentList.map((item) => {
          item.paragraphs.map((item) => {
            len += item.split(" ").length;
          });
          len += item.subHeading.split(" ").length;
        });
    }
    if (selectedCourse) {
      if (Checked) {
        { len <= 150 ? addNewLecApi() : setAlertMiniImageErr(true) }
      }
      else {
        { len <= 250 ? addNewLecApi() : setAlertMiniWordErr(true) }
      }
    } else {
      setAlertMiniAddedErr(true);
    }
  };

  const fetchCourses = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/client/minis`)
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);



  const handleParagraphAdd = (index) => {
    contentList[index].paragraphs.push("");
    setContentList([...contentList]);
  };
  const handleParagraphRemove = (indexP, indexSubh) => {
    console.log(indexP);
    contentList[indexSubh].paragraphs.shift(indexP, 1);
    setContentList([...contentList]);
  };
  const handleSubHeadingAdd = () => {
    setContentList([
      ...contentList,
      { paragraphs: [""], subHeading: "", images: [] },
    ]);
  };
  const handleSubHeadingRemove = () => {
    contentList.pop();
    setContentList([...contentList]);
  };
  const handleLecAddedClick = () => {
    setAlertMiniAdded(false);
    const params = {
      course_id: selectedCourse,
    };
    let url = "/minilecdetails";
    let uri = axios.getUri({ url, params });
    navigate(uri);
  };

  const handleLecUpdated = () => {
    setAlertMiniUpdated(false);
    const params = {
      course_id: selectedCourse,
    };
    let url = "/minilecdetails";
    let uri = axios.getUri({ url, params });
    navigate(uri);
  };

  return (
    <div>
      <AlertMiniAdded
        alertMiniAdded={alertMiniAdded}
        handleClick={handleLecAddedClick}
      />
      <AlertMiniErr
        alertMiniAddedErr={alertMiniAddedErr}
        handleClick={() => setAlertMiniAddedErr(false)}
      />
      <AlertMiniWordErr
        alertMiniWordErr={alertMiniWordErr}
        handleClick={() => setAlertMiniWordErr(false)}
      />
      <AlertMiniImageErr
        alertMiniImageErr={alertMiniImageErr}
        handleClick={() => setAlertMiniImageErr(false)}
      />
      <AlertMiniUpdated
        alertUpdated={alertMiniUpdated}
        handleClick={handleLecUpdated}
      />
      <div style={{ margin: "2rem" }}>
        <div className="indexLec">
          <TextField
            id="outlined-basic"
            label={title ? title : "Enter Title"}
            variant="outlined"
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormControl sx={{ m: 1, minWidth: 320 }}>
            <InputLabel
              shrink={selectedCourse ? true : false}
              id="demo-simple-select-helper-label"
            >
              Select Mini
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedCourse}
              onChange={(e) =>
                setSelectedCourse(e.target.value) && console.log(e.target.value)
              }
            >
              {courses.map((course) => (
                <MenuItem value={course._id}>{course.courseName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <h2>Content</h2>
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          checked={Checked}
          label="Image"
          labelPlacement="end"
          onChange={() => {
            setChecked(!Checked);
          }}
        />
        {contentList.map((item, indexSubH) => (
          <div style={{ marginBottom: "2rem" }}>
            <div>
              <TextField
                required
                id="outlined-required"
                style={{ width: "50%" }}
                placeholder="Enter Sub Heading"
                value={item.subHeading}
                onChange={(event) => {
                  item.subHeading = event.target.value;
                  setContentList([...contentList]);
                }}
              />
            </div>
            <TextField
              id="outlined-multiline-flexible"
              style={{ width: "100%", marginTop: "5px" }}
              multiline
              rows={10}
              placeholder="Write a Paragraph"
              value={item.paragraphs.join("\n")}
              onChange={(event) => {
                item.paragraphs = event.target.value.split("\n");
                setContentList([...contentList]);
              }}
            />
            <Button
              variant="contained"
              style={{ display: "block" }}
              onClick={handleSubHeadingRemove}
              className="button"
            >
              Remove Subheading
            </Button>
            {contentList.length - 1 === indexSubH && (
              <Button
                variant="contained"
                style={{ marginTop: "15px", display: "block" }}
                onClick={handleSubHeadingAdd}
                className="buttonArea"
              >
                Add Subheading
              </Button>
            )}
          </div>
        ))}
        <Button variant="contained" onClick={LecId ? updateLecture : addNewLec}>
          {LecId ? "Update Mini" : "Add Mini"}
        </Button>
      </div>
    </div>
  );
};

export default Mini;
