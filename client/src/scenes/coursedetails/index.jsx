import { useState, useEffect, cloneElement } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from "react-router-dom";
import axios from "axios";


async function generate(element, course_id) {
    // let lecData = null;

    // await axios({
    //     method: "get",
    //     url: `http://localhost:5000/client/course?id=${course_id}`,
    // }).then((res) => {
    //     lecData = res.data.lectures;
    //     console.log(lecData);
    //     // setLecture(res.data.lectures);
    // }).catch((err) => { console.log(err) });

    // return lecData.map((value) =>
    //     cloneElement(element, {
    //         key: value,
    //     }),
    // );
    // );
    return [0, 1, 2, 3].map((value) =>
        cloneElement(element, {
            key: value,
        })
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    // get the params form the current route

    let [searchParams, setSearchParams] = useSearchParams();
    const courseId = searchParams.get("course_id");
    console.log(courseId);
    const [lecData, setLecData] = useState();
    const setLecture = (data) => {
        setLecData(data);
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List dense={dense}>
                        {generate(
                            // <h1>hello world</h1>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>, courseId
                        )}
                    </List>
                </Demo>
            </Grid>
        </Box >
    );
}