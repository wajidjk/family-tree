import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import FaceIcon from "@material-ui/icons/Face";
import { useHistory, Link } from "react-router-dom";
import { Store } from "../store";

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

export default function Add(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state, setState } = useContext(Store);

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
        <StyledMenuItem
          disabled={
            (state.selected && state.selected.parent) ||
            (props.node && !state.selected)
          }
        >
          <ListItemIcon>
            <SupervisedUserCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Link to={`/insert?case=P`}> Add Parent</Link>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem disabled={!state.selected}>
          <ListItemIcon>
            <FaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText />
          <ListItemText>
            <Link to={`/insert?case=C`}> Add Children</Link>
          </ListItemText>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
