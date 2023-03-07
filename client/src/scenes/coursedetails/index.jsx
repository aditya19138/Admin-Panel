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
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

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
        await axios.get(`http://localhost:5000/client/lectures?id=${courseId}`)
            .then((response) => {
                setLecData(response.data)
                console.log(response.data[0])
            }).catch((error) => {
                console.log(error)
            })
    }

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
                                primary={item.title}
                            />
                        </ListItem>)
                    )}
                </List>
            </Demo>
        </Box>
    );
}