import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/tooltip';
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDelete({ del, handleClick, id, handleClose }) {
  return (
    <div>
      <Dialog
        open={del}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are About to Delete User !!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick(id)}>Yep</Button>
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

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const MAX_VISIBLE_PAGES = 10;

  const lecId = searchParams.get("lectureId");
  console.log("lecId=" + lecId);

  const fetchAssignments = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/client/assignments`)
      .then((response) => {
        setAsgnData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAxios = async (asgnId, lecId) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/client/assignment/delete`, {
        asgnId: asgnId,
        lectureId: lecId,
      })
      .then((response) => {
        console.log(response.data);
        setAsgnData(asgnData.filter((asgn) => asgn._id !== asgnId));
        setDelDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentPageData = () => {
    if (!asgnData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return asgnData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getPaginationRange = () => {
    if (!asgnData) return [];
    const totalPages = Math.ceil(asgnData.length / ITEMS_PER_PAGE);

    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, totalPages);

    if (startPage <= halfVisible) {
      endPage = MAX_VISIBLE_PAGES;
    }

    if (endPage >= totalPages - halfVisible) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
    }

    const pageRange = [];
    if (startPage > 1) {
      pageRange.push(1);
      if (startPage > 2) {
        pageRange.push("...");
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageRange.push("...");
      }
      pageRange.push(totalPages);
    }

    return pageRange;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (userId) => {
    setDelDialog(true);
    setId(userId);
  };

  const handleClose = () => {
    setDelDialog(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (lecId)
      setAsgnData(asgnData?.filter((asgn) => asgn.lectureId === lecId));
  }, [asgnData]);

  // console.log(asgnData)
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }} className="assigment">
      {delDialog && (
        <AlertDelete
          del={delDialog}
          handleClick={handleDeleteAxios}
          id={id}
          handleClose={handleClose}
        />
      )}
      <div className="assigmentHeading">
        <h1>Assignment List</h1>
        <Button variant="contained" component={Link} to={"/assignments/add"}>
          Add Assignment
        </Button>
      </div>
      <Demo className="assigmentList">
        <List className="assigmentLisst">
          {getCurrentPageData()?.map((item) => (
            // create a list of lectures with link to lecture details
            <div className="assigmentItem">
              <ListItem
                key={item._id}
                secondaryAction={
                  // <Tooltip title="Delete" arrow>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  // </Tooltip>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <QuestionAnswerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.question} />
              </ListItem>
            </div>
          ))}
        </List>
      </Demo>
      <div className="pagination">
        {getPaginationRange().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="ellipsis"> ... </span>
            ) : (
              <Button
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "contained" : "outlined"}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
}
