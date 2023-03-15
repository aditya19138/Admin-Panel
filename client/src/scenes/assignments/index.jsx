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
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const [asgnData, setAsgnData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const courseId = searchParams.get("course_id");
    console.log("courseId=" + courseId);
    let url = "/lectures"


    const fetchAssignments = async () => {
        await axios.get(`http://localhost:5000/client/assignments`)
            .then((response) => {
                setAsgnData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleDelete = async (asgnId, lecId) => {
        await axios.post(`http://localhost:5000/client/assignment/delete`, {
            asgnId: asgnId,
            lectureId: lecId

        })
            .then((response) => {
                console.log(response.data)
                setAsgnData(asgnData.filter((asgn) => asgn._id !== asgnId));
            }).catch((error) => {
                console.log(error)
            })
    };


    useEffect(() => {
        fetchAssignments();
    }, [])

    // console.log(asgnData)
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Demo>
                <List >
                    {asgnData?.map((item) => (
                        // create a list of lectures with link to lecture details

                        <ListItem
                            key={item._id}
                            // component={Link}
                            // to={`/lecture?lecId=${item._id}`}
                            // onClick={navigate(axios.getUri({ url: "/lectures", searchparams: { lectureId: item._id } }))}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={handleDelete(item._id, item.lectureId)} >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <QuestionAnswerIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.question}
                            />
                        </ListItem>)
                    )}
                </List>
            </Demo>
        </Box>
    );
}