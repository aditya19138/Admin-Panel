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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './index.css'

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
                onClose={()=>handleClick(id)}
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

export default function Assignments() {
    const [asgnData, setAsgnData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const [delDialog, setDelDialog] = useState(false);
    const [id, setId] = useState();
    const lecId = searchParams.get("lectureId");
    console.log("lecId=" + lecId);


    const fetchAssignments = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/assignments`)
            .then((response) => {
                setAsgnData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    };

    const handleDeleteAxios = async (asgnId, lecId) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/client/assignment/delete`, {
            asgnId: asgnId,
            lectureId: lecId

        })
            .then((response) => {
                console.log(response.data)
                setAsgnData(asgnData.filter((asgn) => asgn._id !== asgnId));
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
        fetchAssignments();
    }, [])

    useEffect(() => {
        if (lecId) setAsgnData(asgnData?.filter((asgn) => asgn.lectureId === lecId));
    }, [asgnData]);

    // console.log(asgnData)
    return (

        <Box sx={{ flexGrow: 1, maxWidth: 752 }} className='assigment'>
            {delDialog && <AlertDelete del={delDialog} handleClick={handleDeleteAxios} id={id}/>}
            <div className='assigmentHeading'>
                <h1>Assignment List</h1>
                <Button
                    variant="contained"
                    component={Link}
                    to={"/assignments/add"}
                >
                    Add Assignment
                </Button>
            </div>
            <Demo className='assigmentList'>
                <List className='assigmentLisst'>
                    {asgnData?.map((item) => (
                        // create a list of lectures with link to lecture details
                        <div className='assigmentItem'>
                            <ListItem
                                key={item._id}
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
                                        <QuestionAnswerIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.question}
                                />
                            </ListItem>
                        </div>
                    )
                    )}
                </List>
            </Demo>
        </Box>
    );
}