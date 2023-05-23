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
import Button from '@mui/material/Button';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const [usersData, setUsersData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const courseId = searchParams.get("course_id");
    console.log("courseId=" + courseId);
    let url = "/lectures"


    const fetchUsers = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/users`)
            .then((response) => {
                setUsersData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleDelete = async (userId) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/client/user/delete?id=${userId}`, {
            userId: userId
        })
            .then((response) => {
                console.log(response.data)
                setUsersData(usersData.filter((users) => users._id !== userId));
            }).catch((error) => {
                console.log(error)
            })
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    // console.log(lecData)
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Button
                    variant="contained"
                    component={Link}
                    to={"/users/add"}
                >
                    Add User
                </Button>
            <Demo>
                <List >
                    {usersData?.map((item) => (
                        // create a list of lectures with link to lecture details

                        <ListItem
                            key={item._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={item.first_name + " " + item.last_name}
                                secondary={item.email}
                            />
                        </ListItem>)
                    )}
                </List>
            </Demo >
        </Box >
    );
}