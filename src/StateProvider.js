import React, { useContext, createContext, useReducer } from "react";

export const StateContext = createContext(); //This line basically prepare the data layer

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); //Allows us to pour info from data layer
