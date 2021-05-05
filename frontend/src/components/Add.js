import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import FaceIcon from "@material-ui/icons/Face";
import { useHistory, Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Add() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        style={{
          background: "transparent",
          color: "rgb(180, 38, 85)",
        }}
        onClick={handleClick}
      >
        <AddCircleOutlineIcon
          style={{
            marginRight: 10,
          }}
        />
        Add
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SupervisedUserCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Link to={`/insert`}> Add Parent</Link>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <FaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText />
          <ListItemText>
            <Link to={`/insert`}> Add Children</Link>
          </ListItemText>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
