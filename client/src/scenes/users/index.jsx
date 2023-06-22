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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';
import './index.css';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function AlertDelete({del, handleClick, id}) {
    return (
        <div>
            <Dialog
                open={del}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You are About to Delete User !!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleClick(id)}>Yep</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function InteractiveList() {
    const [usersData, setUsersData] = useState(null);
    const [delDialog, setDelDialog] = useState(false);
    const [id, setId] = useState();
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
    const handleDeleteAxios = async (userId) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/client/user/delete?id=${userId}`, {
            userId: userId
        })
            .then((response) => {
                console.log(response.data)
                setUsersData(usersData.filter((users) => users._id !== userId));
                setDelDialog(false);
            }).catch((error) => {
                console.log(error)
            })
    };

    const handleDelete = (userId) => {
        setDelDialog(true);
        setId(userId)
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    // console.log(lecData)
    return (
        <Box sx={{ flexGrow: 5, maxWidth: 752 }} className='user'>
            {delDialog && <AlertDelete del={delDialog} handleClick={handleDeleteAxios} id={id}/>}
            <div className='userHeading'>
                <h1>User List</h1>
                <Button
                    variant="contained"
                    component={Link}
                    to={"/users/add"}
                >
                    Add User
                </Button>
            </div>
            <Demo className='userList'>
                <List className='userLisst'>
                    {usersData?.map((item) => (
                        // create a list of lectures with link to lecture details
                        <div className='listItem'>
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
                            </ListItem>
                        </div>)
                    )}
                </List>
            </Demo >
        </Box >
    );
}