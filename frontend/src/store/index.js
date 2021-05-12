import React, { useState } from "react";

export const Store = React.createContext();

export const StoreProvidor = (props) => {
  const [state, setState] = useState({
    selected: null,
    root: null,
  });

  return (
    <Store.Provider
      value={{
        state,
        setState,
      }}
    >
      {props.children}
    </Store.Provider>
  );
};
