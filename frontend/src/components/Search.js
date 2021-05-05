import React from "react";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { Input, InputAdornment } from "@material-ui/core";

export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        size="small"
        popupIcon={null}
        options={[]}
        getOptionLabel={(option) => option.title}
        style={{
          width: 275,
          borderRadius: "100px",
        }}
        renderInput={(params) => (
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
            {...params}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            // placeholder="Search"
            variant="standard"
          />
        )}
      />
    </div>
  );
}
