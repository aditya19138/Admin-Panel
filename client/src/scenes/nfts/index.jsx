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
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const ImageDisplay = ({ imageUrl }) => {
    const imageStyle = {
        width: `15%`,
        height: '15%',
    };

    return <img src={imageUrl} alt="Image" style={imageStyle} />;
};


export default function NFTs() {
    const [nftsData, setNftsData] = useState(null);


    const fetchNfts = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/client/nfts`)
            .then((response) => {
                setNftsData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    };

    // const handleDelete = async (asgnId, lecId) => {
    //     await axios.post(`${process.env.REACT_APP_API_URL}/client/assignment/delete`, {
    //         asgnId: asgnId,
    //         lectureId: lecId

    //     })
    //         .then((response) => {
    //             console.log(response.data)
    //             setAsgnData(asgnData.filter((asgn) => asgn._id !== asgnId));
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // };



    useEffect(() => {
        fetchNfts();
    }, [])

    // console.log(asgnData)
    return (

        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            {/* <Button
                variant="contained"
                component={Link}
                to={"/assignments/add"}
            >
                Add Assignment
            </Button> */}
            <Demo>
                <List >
                    {nftsData?.map((item) => (
                        // create a list of lectures with link to lecture details
                        <ListItem
                            key={item._id}
                        // secondaryAction={
                        //     <Tooltip title="Delete" arrow>
                        //         <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id)}>
                        //             <DeleteIcon />
                        //         </IconButton>
                        //     </Tooltip>
                        // }
                        >
                            <ImageDisplay imageUrl={item.image} />
                            <ListItemAvatar>
                                <Avatar>
                                    <QuestionAnswerIcon />
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