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
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
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

export default function InteractiveList() {
  const [usersData, setUsersData] = useState(null);
  const [delDialog, setDelDialog] = useState(false);
  const [id, setId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const MAX_VISIBLE_PAGES = 10;

  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get("course_id");
  console.log("courseId=" + courseId);
  let url = "/lectures";

  const fetchUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/client/users`)
      .then((response) => {
        setUsersData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteAxios = async (userId) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/client/user/delete?id=${userId}`,
        {
          userId: userId,
        }
      )
      .then((response) => {
        console.log(response.data);
        setUsersData(usersData.filter((users) => users._id !== userId));
        setDelDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentPageData = () => {
    if (!usersData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return usersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getPaginationRange = () => {
    if (!usersData) return [];
    const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);

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
    fetchUsers();
  }, []);

  // console.log(lecData)
  return (
    <Box sx={{ flexGrow: 5, maxWidth: 752 }} className="user">
      {delDialog && (
        <AlertDelete
          del={delDialog}
          handleClick={handleDeleteAxios}
          id={id}
          handleClose={handleClose}
        />
      )}
      <div className="userHeading">
        <h1>User List</h1>
        <Button variant="contained" component={Link} to={"/users/add"}>
          Add User
        </Button>
      </div>
      <Demo className="userList">
        <List className="userLisst">
          {getCurrentPageData()?.map((item) => (
            // create a list of lectures with link to lecture details

            <div className="listItem">
              <ListItem
                key={item._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.first_name + " " + item.last_name}
                  secondary={item.email}
                />
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
