import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory, useLocation } from "react-router-dom";
import { Store } from "../store";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useMutation } from "react-query";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Modal() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [method, setMethod] = useState();
  const { state, setState } = useContext(Store);
  const location = useLocation();
  const history = useHistory();

  console.log(state);

  const { mutate: addNode } = useMutation(
    async (input) => {
      const response = await fetch(`http://localhost:5000/api/node`, {
        body: JSON.stringify(input),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return (await response.json()).node;
    },
    {
      onSettled: (data) => {
        // TODO load the added node

        console.log(data);
        history.push(`/?id=${data._id}`);
      },
    }
  );

  useEffect(() => {
    setMethod(new URLSearchParams(location.search).get("case"));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <div className="main_div">
      <div className="Modal_div">
        <p style={{ fontSize: 25, color: "rgba(180, 38, 85)" }}>Family Tree</p>
        <br />
        <br />
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label="FirstName"
          />
          <TextField
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            label="LastName"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Birthday"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </form>
        <br />
        <br />
        <Button
          onClick={() => {
            addNode({
              firstName: firstname,
              lastName: lastname,
              birthday: selectedDate,
              targetId: state.selected?._id,
              procedure: method,
            });
          }}
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "rgba(180, 38, 85)",
          }}
          color="secondary"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
