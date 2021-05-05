import React from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Add from "../components/Add";
export default function Homepage() {
  return (
    <div className="main_div">
      <div className="center_div">
        <p style={{ fontSize: 25, color: "rgba(180, 38, 85)" }}>Family Tree</p>

        <br />
        <Add />
      </div>
    </div>
  );
}
