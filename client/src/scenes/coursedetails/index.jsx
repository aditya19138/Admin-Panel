import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const [lecData, setLecData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const courseId = searchParams.get("course_id");
    console.log("courseId=" + courseId);
    let url = "/lectures"


    const fetchLectures = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/lectures?id=${courseId}`)
            .then((response) => {
                setLecData(response.data)
                console.log(response.data[0])
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleDelete = async (lectureId) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/client/lecture/delete?id=${lectureId}`, {
            lectureId: lectureId,
            courseId: courseId

        })
            .then((response) => {
                console.log(response.data)
                setLecData(lecData.filter((lecture) => lecture._id !== lectureId));
            }).catch((error) => {
                console.log(error)
            })
    };


    useEffect(() => {
        fetchLectures();
    }, [])

    console.log(lecData)
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Demo>
                <List >
                    {lecData?.map((item) => (

                        // create a list of lectures with link to lecture details
                        <ListItem
                            key={item._id}
                            component={Link}
                            to={`/lecture?lecId=${item._id}`}
                            // onClick={navigate(axios.getUri({ url: "/lectures", searchparams: { lectureId: item._id } }))}
                            secondaryAction={
                                <Tooltip title="Delete" arrow>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        >

                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                            />
                            <Tooltip title="View Asignments" arrow>
                                <Button
                                    component={Link}
                                    to={`/assignments?lectureId=${item._id}`}
                                >
                                    <Avatar>
                                        <AssignmentIcon />
                                    </Avatar>
                                </Button>
                            </Tooltip>

                        </ListItem>)
                    )}
                </List>
            </Demo>
        </Box>
    );
}