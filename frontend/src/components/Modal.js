import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  console.log(firstname);
  console.log(lastname);
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
